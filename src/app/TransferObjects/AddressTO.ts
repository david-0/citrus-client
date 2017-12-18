import {IAddress, IGpsLocation, IUser} from "citrus-common";
import {UserInfoTO} from "./UserInfoTO";

export class AddressTO implements IAddress {

  public id: number;
  public user: IUser;
  public description: string;
  public name: string;
  public prename: string;
  public street: string;
  public number: string;
  public addition: string;
  public zipcode: string;
  public city: string;
  public gpsLocation: IGpsLocation;

  constructor(address: IAddress) {
    this.user = address.user;
    this.description = address.description;
    this.name = address.name;
    this.prename = address.prename;
    this.street = address.street;
    this.number = address.number;
    this.addition = address.addition;
    this.zipcode = address.zipcode;
    this.city = address.city;
    this.gpsLocation = address.gpsLocation;
  }

  public static createEmpty(): IAddress {
    return new AddressTO({
      user: UserInfoTO.createEmptyUser(),
      description: "",
      name: "",
      prename: "",
      street: "",
      number: "",
      addition: "",
      zipcode: "",
      city: "",
      gpsLocation: null
    });
  }

  static createAddressWithId(id: number, address: IAddress): IAddress {
    const to = new AddressTO(address);
    to.id = id;
    return to;
  }
}
