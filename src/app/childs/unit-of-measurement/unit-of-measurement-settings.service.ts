import {Injectable} from "@angular/core";
import {SettingsServiceInterface} from "../../table-support/settings-service-interface";

@Injectable()
export class UnitOfMeasurementSettingsService implements SettingsServiceInterface {

  public pageSize = 5;
  public pageIndex = 0;
  public filterValue = "";

  constructor() {
  }
}
