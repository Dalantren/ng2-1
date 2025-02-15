import { Component, NgZone, ChangeDetectionStrategy } from '@angular/core';
import { DataService } from '../data.service';
import { GridModel, Grid, PipeContext } from 'ng2-qgrid';

const EXAMPLE_TAGS = ['pipe-grid-basic', 'Custom pipe demonstration'];

@Component({
  selector: 'example-pipe-grid-basic',
  templateUrl: 'example-pipe-grid-basic.component.html',
  styleUrls: ['example-pipe-grid-basic.component.scss'],
  providers: [DataService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExamplePipeGridBasicComponent {
  static tags = EXAMPLE_TAGS;
  title = EXAMPLE_TAGS[1];

  gridModel: GridModel;

  constructor(dataService: DataService, qgrid: Grid, zone: NgZone) {
    this.gridModel = qgrid.model();

    const myDataPipe =
      (rows: any[], context: PipeContext, next: (data: any[]) => void) => {
        zone.runOutsideAngular(() =>
          setTimeout(
            () => dataService
              .getAtoms()
              .subscribe(next)
            , 1000),
        );
      };

    this.gridModel.data({
      pipe: [myDataPipe].concat(qgrid.pipeUnit.view as any[]),
    });
  }
}
