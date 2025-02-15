import { lineView } from '../column/column.service';
import { GridError } from '../infrastructure/error';
import { Node } from '../node/node';

export class Scene {
  constructor(model) {
    this.model = model;
  }

  rows(memo) {
    const { nodes, rows } = memo;
    if (nodes.length) {
      if (!(rows.length && rows[0] instanceof Node)) {
        const { flattenFactory } = this.model.group();
        const flatten = flattenFactory(this.model);
        return flatten(nodes);
      }
    }

    return rows;
  }

  columnRows(items) {
    return items;
  }

  columnLine(items) {
    return lineView(items);
  }

  columnArea(items) {
    const line = lineView(items);
    const result = {
      left: [],
      right: [],
      mid: [],
    };

    for (let i = 0, length = line.length; i < length; i++) {
      const column = line[i];
      const { pin } = column.model;
      const area = result[pin];
      if (!area) {
        throw new GridError('scene', `Unsupported pin ${pin}`);
      }

      area.push(column);
    }

    return result;
  }
}
