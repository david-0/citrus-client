import {Component, OnInit, ViewChild} from "@angular/core";
import {MatPaginator, MatSort} from "@angular/material";
import {IAddress} from "citrus-common";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {GenericPagedDataSource} from "../../../table-support/generic-paged-data-source";
import {AddressRestDatabaseService} from "../address-rest-database.service";
import {AddressSettingsService} from "../address-settings.service";

@Component({
  selector: "app-address-overview",
  templateUrl: "./address-overview.component.html",
  styleUrls: ["./address-overview.component.scss"]
})
export class AddressOverviewComponent implements OnInit {
  public displayedColumns = ["name", "prename", "street", "number", "plz", "city"];
  public loading = new BehaviorSubject<boolean>(false);

  public dataSource: GenericPagedDataSource<IAddress> | null;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private database: AddressRestDatabaseService, public settings: AddressSettingsService) {
  }

  ngOnInit() {
    this.dataSource = new GenericPagedDataSource(this.database, this.paginator, this.sort, this.settings, this.loading);
    this.paginator.page.subscribe(event => {
      this.settings.pageIndex = event.pageIndex;
      this.settings.pageSize = event.pageSize;
    });
  }

  public onFilterChange(filter: string) {
    if (!this.dataSource) {
      return;
    }
    this.dataSource.filter = filter;
  }
}
