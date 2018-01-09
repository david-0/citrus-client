import {TAddress} from "./t-address";
import {TModel} from "./t-id";

export class TUser extends TModel {
  number: number;
  email: string;
  name: string;
  prename: string;
  phone: string;
  mobile: string;
  addressIds: number[];
  addresses: TAddress[];
}
