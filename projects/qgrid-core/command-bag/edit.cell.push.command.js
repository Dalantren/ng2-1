import { CellEditor } from '../edit/edit.cell.editor';
import { Command } from '../command/command';
import { editCellContextFactory } from '../edit/edit.cell.context.factory';
import * as validationService from '../validation/validation.service';
import { EDIT_CELL_PUSH_COMMAND_KEY } from './command.bag';

export class EditCellPushCommand extends Command {
    constructor(plugin) {
        const { model, view } = plugin;

        super({
            key: EDIT_CELL_PUSH_COMMAND_KEY,
            priority: 1,
            canExecute: cell => {
                const editLet = view.edit.cell;

                cell = cell || editLet.editor.td;
                const canEdit = cell && cell.column.canEdit;
                if (canEdit) {
                    const clientContext = editCellContextFactory(
                        cell,
                        editLet.value,
                        editLet.label,
                        editLet.tag
                    );

                    const { key } = cell.column;
                    const validator = validationService.createValidator(model.validation().rules, key);
                    return validator.validate({ [key]: this.value }) !== false
                        && model.edit().commit.canExecute(clientContext) === true;
                }

                return false;
            },
            execute: (cell, e) => {
                const editLet = view.edit.cell;
                cell = cell || editLet.editor.td;
                
                if (cell) {
                    const clientContext = editCellContextFactory(
                        cell,
                        editLet.value,
                        editLet.label,
                        editLet.tag
                    );

                    if (model.edit().commit.execute(clientContext) !== true) {
                        editLet.editor.commit();
                        editLet.editor = CellEditor.empty;
                        editLet.requestClose = null;

                        return true;
                    }
                }

                return true;
            }
        });
    }
}
