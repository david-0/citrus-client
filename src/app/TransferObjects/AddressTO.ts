import {IAddress, IGpsLocation} from "citrus-common";

export class AddressTO implements IAddress {

  public id: number;
  public name: string;
  public prename: string;
  public street: string;
  public number: string;
  public plz: string;
  public city: string;
  public gpsLocation: IGpsLocation;

  constructor(public address: IAddress) {
    this.name = address.name;
    this.prename = address.prename;
    this.street = address.street;
    this.number = address.number;
    this.plz = address.plz;
    this.city = address.city;
    this.gpsLocation = address.gpsLocation;
  }

  public static createEmpty(): IAddress {
    return new AddressTO({name: "", prename: "", street: "", number: "", plz: "", city: "", gpsLocation: null});
  }

  static createAddressWithId(id: number, address: IAddress): IAddress {
    const to = new AddressTO(address);
    to.id = id;
    return to;
  }
}
