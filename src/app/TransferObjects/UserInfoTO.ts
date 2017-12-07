import {IAddress, ICustomerOrder, IUser, IUserInfo} from "citrus-common";

export class UserInfoTO implements IUserInfo {

  public id: number;
  public number: number;
  public email: string;
  public name: string;
  public prename: string;
  public phone: string;
  public mobile: string;
  public addresses: IAddress[];
  public customerOrders: ICustomerOrder[];

  constructor(public userInfo: IUserInfo) {
    this.number = userInfo.number;
    this.email = userInfo.email;
    this.name = userInfo.name;
    this.prename = userInfo.prename;
    this.phone = userInfo.phone;
    this.mobile = userInfo.mobile;
    this.addresses = userInfo.addresses;
    this.customerOrders = userInfo.customerOrders;
  }

  public static createEmpty(): IUserInfo {
    return new UserInfoTO({number: 0, email: "", name: "", prename: "", phone: "", mobile: "", customerOrders: [], addresses: []});
  }

  public static createEmptyUser(): IUser {
    return ({number: 0, password: "", email: "", name: "", prename: "", phone: "", mobile: "", customerOrders: [], addresses: []});
  }

  static createUserInfoWithId(id: number, userInfo: IUserInfo): IUserInfo {
    const to = new UserInfoTO(userInfo);
    to.id = id;
    return to;
  }
}
