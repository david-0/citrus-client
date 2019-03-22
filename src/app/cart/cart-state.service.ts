import {Injectable} from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class CartStateService {
  private detail = true;

  constructor() {
  }

  public showDetail(): boolean {
    return this.detail;
  }

  public openDetails() {
    this.detail = true;
  }

  public closeDetails() {
    this.detail = false;
  }
}
