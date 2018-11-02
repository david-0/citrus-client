import {Injectable} from "@angular/core";
import {LocationDto} from "citrus-common";

@Injectable({
  providedIn: "root"
})
export class SaleLocationService {

  private key = "saleLocation";

  constructor() {
  }

  public getSaleLocation(): LocationDto {
    return JSON.parse(localStorage.getItem(this.key));
  }

  public setSaleLocation(location: LocationDto) {
    localStorage.setItem(this.key, JSON.stringify(location));
  }

  public clearSaleLocation() {
    localStorage.removeItem(this.key);
  }

}
