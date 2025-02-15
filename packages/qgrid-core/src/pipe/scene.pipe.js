import { Guard } from '../infrastructure/guard';
import { sortFactory } from '../row-list/row.list.sort';
import { Scene } from '../scene/scene';

export function scenePipe(memo, context, next) {
  Guard.notNull(memo, 'memo');

  const tag = {
    source: context.source || 'scene.pipe',
    behavior: 'core',
  };

  const { model } = context;

  const scene = new Scene(model);
  let rows = scene.rows(memo);

  const { columns } = memo;
  const columnLine = scene.columnLine(columns);

  if (!model.sort().by.length) {
    const order = sortFactory(model);
    rows = order(rows);
  }

  model.scene({
    rows,
    column: {
      rows: scene.columnRows(memo.columns),
      area: scene.columnArea(memo.columns),
      line: columnLine,
    },
  }, tag);

  next(memo);
}
