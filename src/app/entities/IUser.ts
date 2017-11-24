import {IId} from "./IId";
import {IRole} from "./IRole";

export interface IUser extends IId {
  email: string;
  password: string;
  roles: IRole[];
}
