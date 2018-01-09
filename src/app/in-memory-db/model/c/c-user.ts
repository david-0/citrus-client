import {CAddress} from "./c-address";
import {CModel} from "./c-model";

export class CUser extends CModel {
  number: number;
  email: string;
  name: string;
  prename: string;
  phone: string;
  mobile: string;
  addressIds: number[];
}
