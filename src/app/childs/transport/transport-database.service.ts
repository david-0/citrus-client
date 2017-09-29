import {Injectable} from '@angular/core';
import {GenericDatabase} from '../../list-support/generic-database';
import {ITransport} from '../../entities/ITransport';
import {IFruitVolume} from '../../entities/IFruitVolume';
import {TransportTO} from '../../TransferObjects/TransportTO';
import {FruitVolumeTO} from '../../TransferObjects/FruitVolumeTO';
import {FruitTO} from '../../TransferObjects/FruitTO';
import {FruitDatabaseService} from './fruit-database.service';

@Injectable()
export class TransportDatabaseService extends GenericDatabase<ITransport> {

  private database: GenericDatabase<ITransport>;

  constructor() {
    super(false, TransportDatabaseService.filterCallback, TransportDatabaseService.transportCompare);
    this.data = this.getTransports();
  }

  private static filterCallback(item: ITransport, filterValue: string): boolean {
    return item.comment.toUpperCase().indexOf(filterValue.toUpperCase()) > -1;
  }

  private static transportCompare(a: ITransport, b: ITransport, order: [{ column: string, direction: string }]): number {
    if (order.length === 0) {
      return 0;
    }

    let propertyA: number | string | Date | IFruitVolume[] = '';
    let propertyB: number | string | Date | IFruitVolume[] = '';

    switch (order[0].column) {
      case 'id':
        [propertyA, propertyB] = [a.id, b.id];
        break;
      case 'departureDate':
        [propertyA, propertyB] = [a.departureDate, b.departureDate];
        break;
      case 'fruitVolumes':
        [propertyA, propertyB] = [a.fruitVolumes, b.fruitVolumes];
        break;
      case 'comment':
        [propertyA, propertyB] = [a.comment, b.comment];
        break;
    }

    const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
    const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

    return (valueA < valueB ? -1 : 1) * (order[0].direction === 'asc' ? 1 : -1);
  }

  private getTransports(): ITransport[] {
    const f = new FruitDatabaseService().data;

    const t1 = new TransportTO(1, new Date('05/01/2000'), 'a x 14');
    const t2 = new TransportTO(2, new Date('05/02/2017'), 'a x 24');
    const t3 = new TransportTO(3, new Date('05/03/2017'), 'b x 14');
    const t4 = new TransportTO(4, new Date('05/04/2017'), 'b x 24');
    const t5 = new TransportTO(5, new Date('05/05/2017'), 'c y 15');
    const t6 = new TransportTO(6, new Date('05/06/2017'), 'c y 24');
    const t7 = new TransportTO(7, new Date('05/07/2017'), 'c y 34');
    const t8 = new TransportTO(8, new Date('05/08/2017'), 'd x 24');
    const t9 = new TransportTO(9, new Date('05/09/2017'), 'd x 34');

    t1.fruitVolumes = [
      new FruitVolumeTO(1, f[0], t1, 300),
      new FruitVolumeTO(2, f[1], t1, 600),
      new FruitVolumeTO(3, f[2], t1, 900),
      new FruitVolumeTO(4, f[3], t1, 1200),
      new FruitVolumeTO(5, f[4], t1, 1500),
      new FruitVolumeTO(6, f[5], t1, 1800)
    ];
    t2.fruitVolumes = [
      new FruitVolumeTO(1, f[0], t1, 300),
      new FruitVolumeTO(2, f[1], t1, 600),
      new FruitVolumeTO(3, f[2], t1, 900),
    ];

    return [t1, t2, t3, t4, t5, t6, t7, t8, t9];
  }

}
