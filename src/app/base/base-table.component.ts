import {OnInit} from "@angular/core";
import {MatTableDataSource} from "@angular/material";
import {DtoId} from "citrus-common/lib/dto/dto-id";
import {GenericRestService} from "../table-support/generic-rest.service";
import {SettingsServiceInterface} from "../table-support/settings-service-interface";

export class BaseTableComponent<T extends DtoId> implements OnInit {

  datasource = new MatTableDataSource<T>();

  constructor(protected rest: GenericRestService<T>, public settings: SettingsServiceInterface) {
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
