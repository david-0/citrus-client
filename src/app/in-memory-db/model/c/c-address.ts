import {CModel} from "./c-model";

export class CAddress extends CModel {
  userId: number;
  description: string;
  name: string;
  prename: string;
  street: string;
  number: string;
  addition: string;
  zipcode: string;
  city: string;
}
