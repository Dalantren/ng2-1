import {
	Component,
	Input,
	ElementRef,
	AfterViewInit,
	NgZone,
	TemplateRef,
	ChangeDetectionStrategy,
	ViewChild,
} from '@angular/core';
import { ColumnModel } from '@qgrid/core/column-type/column.model';
import { ColumnSortPlugin } from '@qgrid/plugins/column-sort/column.sort.plugin';
import { EventListener } from '@qgrid/core/event/event.listener';
import { EventManager } from '@qgrid/core/event/event.manager';
import { FocusAfterRender } from '../focus/focus.service';
import { GridPlugin } from '@qgrid/ngx';
import { SORT_TOGGLE_COMMAND_KEY } from '@qgrid/core/command-bag/sort.toggle.command';

@Component({
	selector: 'q-grid-column-sort',
	templateUrl: './column-sort.component.html',
	providers: [GridPlugin],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ColumnSortComponent implements AfterViewInit {
	@ViewChild(TemplateRef, { static: true }) template: TemplateRef<any>;
	@Input() column: ColumnModel;

	context: { $implicit: ColumnSortComponent } = {
		$implicit: this
	};

	constructor(
		private plugin: GridPlugin,
		private elementRef: ElementRef,
		private zone: NgZone,
	) {
	}

	ngAfterViewInit() {
		const { commandPalette } = this.plugin;
		const toggleSort = commandPalette.get(SORT_TOGGLE_COMMAND_KEY);

		const { nativeElement } = this.elementRef;
		const iconAsc = nativeElement.querySelector('.q-grid-asc');
		const iconDesc = nativeElement.querySelector('.q-grid-desc');

		const columnSort = new ColumnSortPlugin(this.plugin, {
			element: nativeElement,
			column: this.column,
			iconAsc,
			iconDesc
		});

		const listener = new EventListener(nativeElement, new EventManager(this));
		listener.on('click', () => {
			if (toggleSort.canExecute(this.column) === true) {
				toggleSort.execute(this.column);
			}
		});

		this.zone.runOutsideAngular(() =>
			listener.on('mouseleave', () => columnSort.mouseLeave())
		);
	}
}
