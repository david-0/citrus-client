import {Injectable} from "@angular/core";
import {LocationDto} from "citrus-common";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: "root"
})
export class SaleLocationService {

  private key = "saleLocation";
  private saleLocationSubject = new BehaviorSubject<LocationDto>(null);

  constructor() {
    const item = localStorage.getItem(this.key);
    if (item) {
      try {
        this.saleLocationSubject.next(JSON.parse(item));
      } catch (e) {
        localStorage.removeItem(this.key);
      }
    }
  }

  public getSaleLocation(): BehaviorSubject<LocationDto> {
    return this.saleLocationSubject;
  }

  public setSaleLocation(location: LocationDto) {
    if (!this.saleLocationSubject.getValue() || this.saleLocationSubject.getValue().id !== location.id) {
      localStorage.setItem(this.key, JSON.stringify(location));
      this.saleLocationSubject.next(location);
    }
  }

  public clearSaleLocation() {
    localStorage.removeItem(this.key);
    this.saleLocationSubject.next(null);
  }

}
