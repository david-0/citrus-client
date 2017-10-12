import {ITransport} from '../entities/ITransport';
import {IFruitVolume} from '../entities/IFruitVolume';
import {FruitDatabaseService} from '../childs/fruit/fruit-database.service';
import {IFruit} from '../entities/IFruit';
import {FruitVolumeTO} from './FruitVolumeTO';
import {Observable} from 'rxjs/Observable';

export class TransportTO implements ITransport {

  constructor(public id: number, public departureDate: Date, public comment: string, public fruitVolumes: IFruitVolume[] = []) {
  }

  public static deepcopyTransportForPersistence(transport: ITransport): ITransport {
    const result: IFruitVolume[] = [];
    transport.fruitVolumes.forEach(fruitVolume => {
      if (fruitVolume.weightInKg != null) {
        fruitVolume.weightInKg = +fruitVolume.weightInKg;
        if (fruitVolume.weightInKg > 0) {
          if (fruitVolume.transport) {
            fruitVolume.transport = transport;
          }
          result.push(fruitVolume);
        }
      }
    });
    return new TransportTO(transport.id, transport.departureDate, transport.comment, result);
  }

  public static deepcopyTransportForView(t: ITransport, fruitsObservable: Observable<IFruit[]>): Observable<ITransport> {
    return fruitsObservable.map((fruits) => {
      const extendedFruitVolumes = fruits.slice().map(fruit => this.createNewFruitVolume(fruit, t.fruitVolumes));
      return new TransportTO(t.id, t.departureDate, t.comment, extendedFruitVolumes);
    });
  }

  public static createNewTransport(fruitsObservable: Observable<IFruit[]>): Observable<ITransport> {
    return fruitsObservable.map((fruits) => {
      const newFruitVolumes = fruits.slice().map(fruit => new FruitVolumeTO(null, fruit, null, null));
      return new TransportTO(null, new Date(), null, newFruitVolumes);
    });
  }

  private static createNewFruitVolume(value: IFruit, fruitVolumes?: IFruitVolume[]): IFruitVolume {
    const existing = fruitVolumes.filter(fruitVolume => fruitVolume.fruit.id === value.id);
    return (existing.length === 1)
      ? new FruitVolumeTO(existing[0].id, existing[0].fruit, existing[0].transport, existing[0].weightInKg)
      : new FruitVolumeTO(null, value, null, null);
  }
}
