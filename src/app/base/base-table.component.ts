import { OnInit, Directive } from "@angular/core";
import {MatTableDataSource} from "@angular/material/table";
import {IDtoId} from "citrus-common/lib/dto/dto-id";
import {GenericRestService} from "../table-support/generic-rest.service";
import {SettingsServiceInterface} from "../table-support/settings-service-interface";
import {MatSort} from "@angular/material/sort";

@Directive()
export class BaseTableComponent<T extends IDtoId> implements OnInit {

  dataSource = new MatTableDataSource<T>();

  constructor(protected rest: GenericRestService<T>, public settings: SettingsServiceInterface) {
  }

  ngOnInit() {
    const subscription = this.rest.getAll().subscribe(data => {
      this.dataSource.data = data;
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // DataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
}
