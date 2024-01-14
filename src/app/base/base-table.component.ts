import { OnInit, Directive } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { IDtoId } from "citrus-common/lib/dto/i-dto-id";
import { GenericRestService } from "../table-support/generic-rest.service";
import { SettingsServiceInterface } from "../table-support/settings-service-interface";

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
    this.dataSource.filter = filterValue;
  }
}
