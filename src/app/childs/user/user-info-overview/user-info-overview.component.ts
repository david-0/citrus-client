import {Component, OnInit, ViewChild} from "@angular/core";
import {MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {UserInfoDto} from "citrus-common";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {UserInfoDtoRestService} from "../user-info-dto-rest.service";
import {UserDetailsSettingsService} from "../user-info-settings.service";

@Component({
  selector: "app-user-info-overview",
  templateUrl: "./user-info-overview.component.html",
  styleUrls: ["./user-info-overview.component.scss"]
})
export class UserInfoOverviewComponent implements OnInit {
  public loading = new BehaviorSubject<boolean>(false);
  datasource = new MatTableDataSource<UserInfoDto>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private rest: UserInfoDtoRestService, public settings: UserDetailsSettingsService) {
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
