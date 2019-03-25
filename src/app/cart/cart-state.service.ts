import {Injectable} from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class CartStateService {
  private detail = true;

  constructor() {
  }

  public detailsVisible(): boolean {
    return this.detail;
  }

  public openDetails() {
    this.detail = true;
  }

  public closeDetails() {
    this.detail = false;
  }
}
