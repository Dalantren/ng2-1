import { Event } from '@qgrid/core';

export declare class BackdropPlugin {
  closeEvent: Event;

  constructor(context: {
		element: HTMLElement;
		propagate: boolean;
		onKeyDown: (e: any) => void;
	});
}
