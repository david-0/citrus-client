import {Injectable} from '@angular/core';
import {GenericDatabase} from '../../table-support/generic-database';
import {ITransport} from '../../entities/ITransport';
import {IFruitVolume} from '../../entities/IFruitVolume';
import {TransportTO} from '../../TransferObjects/TransportTO';
import {FruitVolumeTO} from '../../TransferObjects/FruitVolumeTO';
import {FruitTO} from '../../TransferObjects/FruitTO';
import {IFruit} from '../../entities/IFruit';

@Injectable()
export class FruitDatabaseService extends GenericDatabase<IFruit> {

  private database: GenericDatabase<IFruit>;

  constructor() {
    super(false, FruitDatabaseService.filterCallback, FruitDatabaseService.transportCompare);
    this.data = this.getFruits();
  }

  private static filterCallback(item: IFruit, filterValue: string): boolean {
    return item.name.toUpperCase().indexOf(filterValue.toUpperCase()) > -1;
  }

  private static transportCompare(a: IFruit, b: IFruit, order: [{ column: string, direction: string }]): number {
    if (order.length === 0) {
      return 0;
    }

    let propertyA: number | string | Date | IFruitVolume[] = '';
    let propertyB: number | string | Date | IFruitVolume[] = '';

    switch (order[0].column) {
      case 'id':
        [propertyA, propertyB] = [a.id, b.id];
        break;
      case 'name':
        [propertyA, propertyB] = [a.name, b.name];
        break;
    }

    const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
    const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

    return (valueA < valueB ? -1 : 1) * (order[0].direction === 'asc' ? 1 : -1);
  }

  private getFruits(): IFruit[] {
    const f1 = new FruitTO(1, 'Orangen');
    const f2 = new FruitTO(2, 'Grapefruit rot');
    const f3 = new FruitTO(3, 'Grapefruit gelb');
    const f4 = new FruitTO(4, 'Zitronen');
    const f5 = new FruitTO(5, 'Mandarinen');
    const f6 = new FruitTO(6, 'Avokado');

    return [f1, f2, f3, f4, f5, f6];
  }

}
