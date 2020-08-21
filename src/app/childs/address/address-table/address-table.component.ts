import {Component, Input, ViewChild} from "@angular/core";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {AddressDto} from "citrus-common";
import {BaseTableComponent} from "../../../base/base-table.component";
import {AddressSettingsService} from "../address-settings.service";
import {AddressWithUserDtoRestService} from "../address-with-user-dto-rest.service";

@Component({
  selector: "app-address-table",
  templateUrl: "./address-table.component.html",
  styleUrls: ["./address-table.component.scss"]
})
export class AddressTableComponent extends BaseTableComponent<AddressDto>{

  @Input() displayedColumns: string[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(rest: AddressWithUserDtoRestService, settings: AddressSettingsService) {
    super(rest, settings);
  }
}
