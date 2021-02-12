import { Component, OnInit, DoCheck, ChangeDetectorRef, NgZone, ChangeDetectionStrategy, ElementRef } from '@angular/core';
import { CellClassService } from '../cell/cell-class.service';
import { CellTemplateService } from '../cell/cell-template.service';
import { GRID_INVALIDATE_COMMAND_KEY, STYLE_INVALIDATE_COMMAND_KEY } from '@qgrid/core/command-bag/command.bag';
import { GridPlugin } from '../plugin/grid-plugin';
import { ViewHost } from '@qgrid/core/view/view.host';
import { VisibilityState } from '@qgrid/core/visibility/visibility.state';
import { prob } from '@qgrid/core/command/command';

@Component({
	selector: 'q-grid-core-view',
	templateUrl: './view-core.component.html',
	providers: [
		CellTemplateService,
		CellClassService,
		GridPlugin,
	],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewCoreComponent implements OnInit, DoCheck {
	private host: ViewHost;

	constructor(
		private plugin: GridPlugin,
		private cd: ChangeDetectorRef,
		private zone: NgZone,
	) {
		zone
			.onStable
			.subscribe(() => {
				const { model, table } = this.plugin;
				if (model) {
					const { status } = model.scene();
					if (status === 'push') {
						table.invalidate();

						model.scene({
							status: 'stop'
						}, {
							source: 'view-core.component',
							behavior: 'core'
						});

						if (this.host) {
							this.invalidateStyle();
						}
					}
				}
			});
	}

	ngDoCheck() {
		if (this.host) {
			this.invalidateStyle();
		}
	}

	ngOnInit() {
		const {
			model,
			table,
			observeReply,
			observe,
			commandPalette
		} = this.plugin;

		this.host = new ViewHost(this.plugin);

		observeReply(model.sceneChanged)
			.subscribe(e => {
				if (e.hasChanges('status') && e.state.status === 'pull') {
					this.cd.markForCheck();

					this.zone.run(() =>
						model.scene({
							status: 'push'
						}, {
							source: 'view-core.component',
							behavior: 'core'
						})
					);
				}
			});

		observe(model.styleChanged)
			.subscribe(() => this.invalidateStyle());

		observe(model.layoutChanged)
			.subscribe(e => {
				if (e.hasChanges('rows')) {
					this.invalidateStyle();
				}
			});

		observeReply(model.editChanged)
			.subscribe(e => {
				if (e.hasChanges('status')) {
					if (e.state.status === 'endBatch') {
						const invalidate = commandPalette.get(GRID_INVALIDATE_COMMAND_KEY);
						invalidate.execute({
							source: 'view-core.component',
							why: 'refresh'
						});
					}
				}
			});

		if (model.scroll().mode === 'virtual') {
			const asVirtualBody = table.body as any;
			if (asVirtualBody.requestInvalidate) {
				asVirtualBody.requestInvalidate.on(() => this.invalidateStyle());
			}
		}
	}

	get visibility(): VisibilityState {
		const { model } = this.plugin;
		return model.visibility();
	}

	private invalidateStyle() {
		const { commandPalette } = this.plugin;
		const styleInvalidate = commandPalette.get(STYLE_INVALIDATE_COMMAND_KEY);
		prob(styleInvalidate);
	}
}
