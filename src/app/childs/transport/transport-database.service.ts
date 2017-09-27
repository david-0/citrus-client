import {Injectable} from '@angular/core';
import {GenericDatabase} from '../../list-support/generic-database';
import {ITransport} from '../../entities/ITransport';
import {IFruitVolume} from '../../entities/IFruitVolume';

@Injectable()
export class TransportDatabaseService extends GenericDatabase<ITransport> {

  private database: GenericDatabase<ITransport>;

  constructor() {
    super(false, TransportDatabaseService.filterCallback, TransportDatabaseService.transportCompare);
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
}
