import {IFruit} from '../entities/IFruit';

export class FruitTO implements IFruit {

  constructor(public id: number, public name: string) {
  }
}
