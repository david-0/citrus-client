import {IFruit} from '../entities/IFruit';
import {IFruitVolume} from '../entities/IFruitVolume';
import {ITransport} from '../entities/ITransport';

export class FruitVolumeTO implements IFruitVolume {

  constructor(public id: number, public fruit: IFruit, public transport: ITransport, public weightInKg: number) {
  }
}
