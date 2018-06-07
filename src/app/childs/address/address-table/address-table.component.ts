import {Component, Input, ViewChild} from "@angular/core";
import {MatPaginator, MatSort} from "@angular/material";
import {AddressDto} from "citrus-common";
import {BaseTableComponent} from "../../../base/base-table.component";
import {AddressDtoRestService} from "../address-dto-rest.service";
import {AddressSettingsService} from "../address-settings.service";

@Component({
  selector: "app-address-table",
  templateUrl: "./address-table.component.html",
  styleUrls: ["./address-table.component.scss"]
})
export class AddressTableComponent extends BaseTableComponent<AddressDto>{

  @Input() displayedColumns: string[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(rest: AddressDtoRestService, settings: AddressSettingsService) {
    super(rest, settings);
  }
}
