import { Command, prob } from '../command/command';
import { LEFT_BUTTON, stringify } from '../mouse/mouse.code';
import {
    EDIT_CELL_ENTER_COMMAND_KEY,
    SELECTION_CLICK_COMMAND_KEY,
    NAVIGATION_GO_TO_COMMAND_KEY,
    SELECTION_RANGE_COMMAND_KEY,
    MOUSE_DOWN_COMMAND_KEY
} from './command.bag';

export class MouseDownCommand extends Command {
    constructor(plugin) {
        const { model, commandPalette } = plugin;

        super({
            key: MOUSE_DOWN_COMMAND_KEY,
            execute: ([cell, code]) => {
                model.mouse({
                    code: stringify(code),
                    status: 'down',
                    target: cell
                }, {
                    source: 'mouse.down.command'
                });

                if (cell && code === LEFT_BUTTON) {
                    const fromNotEditMode = model.edit().status === 'view'

                    const navigate = commandPalette.get(NAVIGATION_GO_TO_COMMAND_KEY);
                    prob(navigate, cell);

                    const select = commandPalette.get(SELECTION_CLICK_COMMAND_KEY);
                    prob(select, cell);

                    if (fromNotEditMode) {
                        const enter = commandPalette.get(EDIT_CELL_ENTER_COMMAND_KEY);
                        prob(enter, [cell, 'mousedown']);
                    }

                    const selectRange = commandPalette.get(SELECTION_RANGE_COMMAND_KEY);
                    prob(selectRange, [cell, null]);
                }
            }
        });
    }
}
