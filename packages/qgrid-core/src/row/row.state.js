import { Command } from '../command/command';
import { Resource } from '../resource/resource';

export class RowState {
  constructor() {
    this.resource = new Resource();

    this.mode = 'single'; // single | multiple | all
    this.unit = 'data'; // data | details
    this.height = element => element && element.offsetHeight || 64; // number | function(element, index)
    this.status = new Map();
    this.shortcut = {
      toggle: 'space|enter',
    };
    this.canMove = false;
    this.canResize = false;
    this.minHeight = 0;
    this.pinTop = [];
    this.pinBottom = [];
    this.toggle = new Command();
  }
}
