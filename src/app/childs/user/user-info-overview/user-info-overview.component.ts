import {Component, OnInit, ViewChild} from "@angular/core";
import {MatPaginator, MatSort} from "@angular/material";
import {IUserInfo} from "citrus-common";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {GenericPagedDataSource} from "../../../table-support/generic-paged-data-source";
import {UserInfoRestDatabaseService} from "../user-info-rest-database.service";
import {UserDetailsSettingsService} from "../user-info-settings.service";

@Component({
  selector: "app-user-info-overview",
  templateUrl: "./user-info-overview.component.html",
  styleUrls: ["./user-info-overview.component.scss"]
})
export class UserInfoOverviewComponent implements OnInit {
  public displayedColumns = ["email", "name", "prename", "phone", "mobile"];
  public loading = new BehaviorSubject<boolean>(false);

  public dataSource: GenericPagedDataSource<IUserInfo> | null;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private database: UserInfoRestDatabaseService, public settings: UserDetailsSettingsService) {
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
