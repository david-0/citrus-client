import {IFruit} from "./IFruit";
import {IId} from "./IId";
import {ITransport} from "./ITransport";

export interface IFruitVolume extends IId {
  fruit: IFruit;
  weightInKg: number;
  transport: ITransport;
}
