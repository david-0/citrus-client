import {Component, OnInit, ViewChild} from "@angular/core";
import {MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {UserDto} from "citrus-common";
import {BehaviorSubject} from "rxjs";
import {UserDtoRestService} from "../user-dto-rest.service";
import {UserDetailsSettingsService} from "../user-info-settings.service";

@Component({
  selector: "app-user-overview",
  templateUrl: "./user-overview.component.html",
  styleUrls: ["./user-overview.component.scss"]
})
export class UserOverviewComponent implements OnInit {
  public loading = new BehaviorSubject<boolean>(false);
  dataSource = new MatTableDataSource<UserDto>();

  public displayedColumns = ["number", "email", "name", "prename", "phone", "mobile"];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private rest: UserDtoRestService, public settings: UserDetailsSettingsService) {
  }

  ngOnInit() {
    const subscription = this.rest.getAll().subscribe(data => {
      this.dataSource.data = data;
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
}
