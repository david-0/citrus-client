import {Injectable} from "@angular/core";
import {SettingsServiceInterface} from "../../table-support/settings-service-interface";

@Injectable({
  providedIn: "root"
})
export class PickupLocationSettingsService implements SettingsServiceInterface {

  public pageSize = 5;
  public pageIndex = 0;
  public filterValue = "";

  constructor() {
  }
}
