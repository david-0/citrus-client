import {IAddress, ICustomerOrder, IUser, IUserInfo} from "citrus-common";

export class UserInfoTO implements IUserInfo {

  public id: number;
  public email: string;
  public name: string;
  public prename: string;
  public phone: string;
  public mobile: string;
  public addresses: IAddress[];
  public orders: ICustomerOrder[];

  constructor(public userInfo: IUserInfo) {
    this.email = userInfo.email;
    this.name = userInfo.name;
    this.prename = userInfo.prename;
    this.phone = userInfo.phone;
    this.mobile = userInfo.mobile;
    this.addresses = userInfo.addresses;
    this.orders = userInfo.orders;
  }

  public static createEmpty(): IUserInfo {
    return new UserInfoTO({email: "", name: "", prename: "", phone: "", mobile: "", orders: [], addresses: []});
  }

  public static createEmptyUser(): IUser {
    return ({password: "", email: "", name: "", prename: "", phone: "", mobile: "", orders: [], addresses: []});
  }

  static createUserInfoWithId(id: number, userInfo: IUserInfo): IUserInfo {
    const to = new UserInfoTO(userInfo);
    to.id = id;
    return to;
  }
}
