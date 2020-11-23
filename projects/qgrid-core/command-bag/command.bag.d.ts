import { CellView, CellViewPosition } from '../scene/view/cell.view';
import { ColumnModel } from '../column-type/column.model';
import { CommandKey } from '../command/command.key';
import { ModelChanges } from '../model/model.event';
import { PipeCallback, PipeUnitWhy } from '../pipe/pipe.types';

export declare type GridInvalidateCommandArg = {
    source: string,
    changes: ModelChanges<any>,
    pipe: PipeCallback<any, any>[],
    why: PipeUnitWhy
};

export interface DropCommandArg {
	path: HTMLElement[];
	dragData: any;
	dropData: any;
	action: string; // 'over' | 'drop' | 'end';

	inAreaY(element: HTMLElement): boolean;
	inAreaX(element: HTMLElement): boolean;
}

export declare const BLUR_COMMAND_KEY: CommandKey<any>;
export declare const CLIPBOARD_COPY_COMMAND_KEY: CommandKey<any>;
export declare const COLUMN_DRAG_COMMAND_KEY: CommandKey<{ data: string }>;
export declare const COLUMN_DROP_COMMAND_KEY: CommandKey<DropCommandArg>;
export declare const COLUMN_RESIZE_COMMAND_KEY: CommandKey<{ data: any; width: number; kind: string; }>;
export declare const DOCUMENT_CLICK_COMMAND_KEY: CommandKey<[HTMLElement, MouseEvent]>;
export declare const EDIT_CELL_CANCEL_COMMAND_KEY: CommandKey<CellView>;
export declare const EDIT_CELL_CLEAR_COMMAND_KEY: CommandKey<CellView>;
export declare const EDIT_CELL_COMMIT_COMMAND_KEY: CommandKey<CellView>;
export declare const EDIT_CELL_ENTER_COMMAND_KEY: CommandKey<CellView>;
export declare const EDIT_CELL_EXIT_COMMAND_KEY: CommandKey<CellView>;
export declare const EDIT_CELL_PUSH_COMMAND_KEY: CommandKey<CellView>;
export declare const EDIT_CELL_RESET_COMMAND_KEY: CommandKey<CellView>;
export declare const EDIT_ROW_CANCEL_COMMAND_KEY: CommandKey<any>;
export declare const EDIT_ROW_COMMIT_COMMAND_KEY: CommandKey<any>;
export declare const EDIT_ROW_ENTER_COMMAND_KEY: CommandKey<any>;
export declare const EDIT_ROW_RESET_COMMAND_KEY: CommandKey<any>;
export declare const FILTER_ROW_COMMIT_COMMAND_KEY: CommandKey<[ColumnModel, any]>;
export declare const FOCUS_AFTER_RENDER_COMMAND_KEY: CommandKey<CellViewPosition>;
export declare const FOCUS_COMMAND_KEY: CommandKey<any>;
export declare const BUSY_COMMAND_KEY: CommandKey<any>;
export declare const GRID_INVALIDATE_COMMAND_KEY: CommandKey<Partial<GridInvalidateCommandArg>>;
export declare const GROUP_STATUS_TOGGLE_ALL_COMMAND_KEY: CommandKey<any>;
export declare const GROUP_STATUS_TOGGLE_COMMAND_KEY: CommandKey<[ColumnModel, any]>;
export declare const HIGHLIGHT_CELL_COMMAND_KEY: CommandKey<CellViewPosition>;
export declare const HIGHLIGHT_CLEAR_COMMAND_KEY: CommandKey<any>;
export declare const HIGHLIGHT_COLUMN_COMMAND_KEY: CommandKey<[ColumnModel, boolean]>;
export declare const HIGHLIGHT_ROW_COMMAND_KEY: CommandKey<[number, boolean]>;
export declare const KEY_DOWN_COMMAND_KEY: CommandKey<string>;
export declare const KEY_RELEASE_COMMAND_KEY: CommandKey<any>;
export declare const KEY_UP_COMMAND_KEY: CommandKey<string>;
export declare const MOUSE_DOWN_COMMAND_KEY: CommandKey<[CellView, MouseEvent]>;
export declare const MOUSE_MOVE_COMMAND_KEY: CommandKey<CellView>;
export declare const MOUSE_UP_COMMAND_KEY: CommandKey<[CellView, MouseEvent]>;
export declare const NAVIGATION_GO_DOWN_COMMAND_KEY: CommandKey<any>;
export declare const NAVIGATION_GO_DOWNWARD_COMMAND_KEY: CommandKey<any>;
export declare const NAVIGATION_GO_END_COMMAND_KEY: CommandKey<any>;
export declare const NAVIGATION_GO_HOME_COMMAND_KEY: CommandKey<any>;
export declare const NAVIGATION_GO_LEFT_COMMAND_KEY: CommandKey<any>;
export declare const NAVIGATION_GO_NEXT_COMMAND_KEY: CommandKey<any>;
export declare const NAVIGATION_GO_PREVIOUS_COMMAND_KEY: CommandKey<any>;
export declare const NAVIGATION_GO_RIGHT_COMMAND_KEY: CommandKey<any>;
export declare const NAVIGATION_GO_TO_COMMAND_KEY: CommandKey<CellViewPosition>;
export declare const NAVIGATION_GO_UP_COMMAND_KEY: CommandKey<any>;
export declare const NAVIGATION_GO_UPWARD_COMMAND_KEY: CommandKey<any>;
export declare const NAVIGATION_PAGE_DOWN_COMMAND_KEY: CommandKey<any>;
export declare const NAVIGATION_PAGE_UP_COMMAND_KEY: CommandKey<any>;
export declare const SCROLL_TO_COMMAND_KEY: CommandKey<[number, number]>;
export declare const PAGINATION_NEXT_COMMAND_KEY: CommandKey<any>;
export declare const PAGINATION_PREVIOUS_COMMAND_KEY: CommandKey<any>;
export declare const ROW_DETAILS_TOGGLE_STATUS_COMMAND_KEY: CommandKey<any>;
export declare const ROW_DRAG_COMMAND_KEY: CommandKey<{ data: number }>;
export declare const ROW_DROP_COMMAND_KEY: CommandKey<DropCommandArg>;
export declare const ROW_RESIZE_COMMAND_KEY: CommandKey<any>;
export declare const SELECTION_ALL_TOGGLE_COMMAND_KEY: CommandKey<any>;
export declare const SELECTION_CELL_TOGGLE_COMMAND_KEY: CommandKey<CellView>;
export declare const SELECTION_CLICK_COMMAND_KEY: CommandKey<CellView>;
export declare const SELECTION_COLUMN_TOGGLE_ACTIVE_COMMAND_KEY: CommandKey<any>;
export declare const SELECTION_COLUMN_TOGGLE_COMMAND_KEY: CommandKey<ColumnModel>;
export declare const SELECTION_COLUMN_TOGGLE_NEXT_COMMAND_KEY: CommandKey<any>;
export declare const SELECTION_COLUMN_TOGGLE_PREVIOUS_COMMAND_KEY: CommandKey<any>;
export declare const SELECTION_RANGE_COMMAND_KEY: CommandKey<any | any[]>;
export declare const SELECTION_ROW_TOGGLE_ACTIVE_COMMAND_KEY: CommandKey<any>;
export declare const SELECTION_ROW_TOGGLE_COMMAND_KEY: CommandKey<any>;
export declare const SELECTION_ROW_TOGGLE_NEXT_COMMAND_KEY: CommandKey<any>;
export declare const SELECTION_ROW_TOGGLE_PREVIOUS_COMMAND_KEY: CommandKey<any>;
export declare const SELECTION_SET_COMMAND_KEY: CommandKey<[any, boolean]>;
export declare const SELECTION_TOGGLE_COMMAND_KEY: CommandKey<any | any[]>;
export declare const SORT_TOGGLE_COMMAND_KEY: CommandKey<ColumnModel>;
export declare const STYLE_INVALIDATE_COMMAND_KEY: CommandKey<any>;
export declare const MOUSE_WHEEL_COMMAND_KEY: CommandKey<number>;
export declare const SCROLL_COMMAND_KEY: CommandKey<[number, number]>;
export declare const LAYOUT_COLUMNS_ISSUE_COMMAND_KEY: CommandKey<any>;
export declare const STYLE_COLUMNS_WRITE_COMMAND_KEY: CommandKey<Map<string, number>>;
export declare const LAYER_BLANK_CHECK_COMMAND_KEY: CommandKey<any>;
export declare const VISIBILITY_CHECK_COMMAND_KEY: CommandKey<any>;
export declare const DRAG_CHECK_COMMAND_KEY: CommandKey<HTMLElement>;
export declare const FOCUS_INVALIDATE_COMMAND_KEY: CommandKey<any>;
export declare const CELL_HANDLER_ANIMATE_COMMAND_KEY: CommandKey<{ handler: HTMLElement, oldCell: CellView, newCell: CellView }>;