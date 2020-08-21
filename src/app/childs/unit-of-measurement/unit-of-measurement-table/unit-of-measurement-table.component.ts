import {Component, Input, ViewChild} from "@angular/core";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {UnitOfMeasurementDto} from "citrus-common";
import {BaseTableComponent} from "../../../base/base-table.component";
import {UnitOfMeasurementDtoRestService} from "../unit-of-measurement-dto-rest.service";
import {UnitOfMeasurementSettingsService} from "../unit-of-measurement-settings.service";

@Component({
  selector: "app-unit-of-measurement-table",
  templateUrl: "./unit-of-measurement-table.component.html",
  styleUrls: ["./unit-of-measurement-table.component.scss"]
})
export class UnitOfMeasurementTableComponent extends BaseTableComponent<UnitOfMeasurementDto> {

  @Input() displayedColumns: string[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(rest: UnitOfMeasurementDtoRestService, settings: UnitOfMeasurementSettingsService) {
    super(rest, settings);
  }
}
