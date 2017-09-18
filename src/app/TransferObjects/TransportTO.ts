import {ITransport} from '../entities/ITransport';
import {IFruitVolume} from '../entities/IFruitVolume';

export class TransportTO implements ITransport {

  constructor(public id: number, public departureDate: Date, public comment: string, public fruitVolumes: IFruitVolume[] = []) {
  }
}
