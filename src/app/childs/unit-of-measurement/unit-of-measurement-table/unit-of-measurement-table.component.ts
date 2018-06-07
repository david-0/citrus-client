import {Component, Input, ViewChild} from "@angular/core";
import {MatPaginator, MatSort} from "@angular/material";
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
  @ViewChild(MatSort) sort: MatSort;

  constructor(rest: UnitOfMeasurementDtoRestService, settings: UnitOfMeasurementSettingsService) {
    super(rest, settings);
  }
}
