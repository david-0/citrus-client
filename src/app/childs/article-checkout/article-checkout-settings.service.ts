import {Injectable} from "@angular/core";
import {SettingsServiceInterface} from "../../table-support/settings-service-interface";

@Injectable({
  providedIn: "root"
})
export class ArticleCheckoutSettingsService implements SettingsServiceInterface {

  public pageSize = 5;
  public pageIndex = 0;
  public filterValue = "";

  constructor() {
  }
}
