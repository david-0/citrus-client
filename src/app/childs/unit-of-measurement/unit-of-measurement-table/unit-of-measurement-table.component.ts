import {Component, Input, OnInit, ViewChild} from "@angular/core";
import {MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {UnitOfMeasurementDto} from "citrus-common";
import {UnitOfMeasurementDtoRestService} from "../unit-of-measurement-dto-rest.service";
import {UnitOfMeasurementSettingsService} from "../unit-of-measurement-settings.service";

@Component({
  selector: "app-unit-of-measurement-table",
  templateUrl: "./unit-of-measurement-table.component.html",
  styleUrls: ["./unit-of-measurement-table.component.scss"]
})
export class UnitOfMeasurementTableComponent implements OnInit {

  datasource = new MatTableDataSource<UnitOfMeasurementDto>();
  @Input() displayedColumns: string[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private rest: UnitOfMeasurementDtoRestService, public settings: UnitOfMeasurementSettingsService
  ) {
  }

  ngOnInit() {
    const subscription = this.rest.getAll().subscribe(data => {
      this.datasource.data = data;
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.datasource.filter = filterValue;
  }
}
