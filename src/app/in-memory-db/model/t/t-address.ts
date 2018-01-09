import {TModel} from "./t-id";
import {TUser} from "./t-user";

export class TAddress extends TModel {
  user: TUser;
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
