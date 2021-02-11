import { isFunction, identity } from '../utility/kit';
import { Fastdom } from '../services/fastdom';
import { GRID_INVALIDATE_COMMAND_KEY, SCROLL_COMMAND_KEY } from '../command-bag/command.bag';

export class ScrollLet {
	constructor(plugin, vscroll) {
		const { model, observeReply, commandPalette } = plugin;
		const { scroll, row, pagination, fetch, pipe } = model;

		this.plugin = plugin;

		const rowHeight = row().height;
		const settings = {
			threshold: pagination().size,
			resetTriggers: []
		};

		if (rowHeight > 0 || isFunction(rowHeight)) {
			settings.rowHeight = rowHeight;
		}

		this.y = vscroll.factory(settings);
		this.y.container.read = Fastdom.measure;
		this.y.container.write = Fastdom.mutate;

		const onDraw =
			(this.y.container.draw$.on || this.y.container.draw$.subscribe)
				.bind(this.y.container.draw$);

		const updateCurrentPage = position => {
			const { size, current, count } = pagination();
			const newCurrent = size === 0
				? 0
				: count - 1 <= position + size
					? Math.ceil(count / size) - 1
					: Math.floor((position + size / 2) / size);

			if (newCurrent !== current) {
				pagination({ current: newCurrent }, {
					source: 'scroll.view',
					behavior: 'core'
				});
			}
		};

		const updateTotalCount = () => {
			const { effect } = pipe();
			if (effect.hasOwnProperty('memo')) {
				const count = effect.memo.length;
				pagination({ count }, {
					source: 'scroll.view',
					behavior: 'core'
				});

				return count;
			}

			return pagination().count;
		};

		onDraw(e => {
			const { position } = e;
			updateCurrentPage(position);

			scroll({
				cursor: position
			}, {
				source: 'scroll.view',
				behavior: 'core'
			});
		});

		switch (scroll().mode) {
			case 'virtual': {
				this.y.settings.fetch = (skip, take, d) => {
					fetch({ skip }, {
						source: 'scroll.view',
						behavior: 'core'
					});

					if (skip === 0) {
						const count = updateTotalCount();
						d.resolve(count);
					} else {
						const invalidate = commandPalette.get(GRID_INVALIDATE_COMMAND_KEY);
						invalidate
							.execute({
								source: 'scroll.view',
								why: 'refresh'
							})
							.then(() => {
								const count = updateTotalCount();
								d.resolve(count);
							});
					}
				};

				let startSource;
				const resetTriggers = new Set(scroll().resetTriggers);

				observeReply(model.sceneChanged)
					.subscribe(e => {
						if (e.hasChanges('status')) {
							const { status } = e.state;
							switch (status) {
								case 'start': {
									startSource = e.tag.source;
									if (resetTriggers.has(startSource)) {
										fetch({ skip: 0 }, {
											source: 'scroll.view',
											behavior: 'core'
										});
									}
									break;
								}
								case 'stop': {
									if (resetTriggers.has(startSource)) {
										this.y.container.reset();
									}
									break;
								}
							}
						}
					});

				break;
			}
			default: {
				observeReply(model.paginationChanged)
					.subscribe(e => {
						if (e.tag.behavior !== 'core') {
							this.y.container.reset();
						}
					});
				break;
			}
		}

		observeReply(model.scrollChanged)
			.subscribe(e => {
				if (e.tag.source === 'scroll.view' ||
					e.tag.source === 'scroll.command') {
					return;
				}

				if (e.hasChanges('mode')) {
					switch (e.state.mode) {
						case 'virtual': {
							scroll({
								map: {
									rowToView: index => index - this.y.container.position,
									viewToRow: index => index + this.y.container.position
								}
							}, {
								source: 'scroll.view',
								behavior: 'core'
							});
							break;
						}
						case 'default': {
							scroll({
								map: {
									rowToView: identity,
									viewToRow: identity
								}
							}, {
								source: 'scroll.view',
							});
							break;
						}
					}
				}

				if (e.hasChanges('left') || e.hasChanges('top')) {
					const scroll = commandPalette.get(SCROLL_COMMAND_KEY);
					const pos = [e.state.left, e.state.top];
					if (scroll.canExecute(pos) === true) {
						scroll.execute(pos);
					}
				}
			});
	}

	get mode() {
		return this.plugin.model.scroll().mode;
	}
}