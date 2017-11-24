import {IFruit} from "../entities/IFruit";

export class FruitTO implements IFruit {

  public id: number;

  constructor(public name: string) {
  }

  static createFruitWithId(id: number, name: string): IFruit {
    const to = new FruitTO(name);
    to.id = id;
    return to;
  }
}
