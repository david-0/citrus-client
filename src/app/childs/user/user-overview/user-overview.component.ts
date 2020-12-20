import {AfterViewInit, Component, OnInit, ViewChild} from "@angular/core";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {UserDto} from "citrus-common";
import {BehaviorSubject} from "rxjs";
import {UserDtoRestService} from "../user-dto-rest.service";
import {UserDetailsSettingsService} from "../user-info-settings.service";

@Component({
  selector: "app-user-overview",
  templateUrl: "./user-overview.component.html",
  styleUrls: ["./user-overview.component.scss"]
})
export class UserOverviewComponent implements OnInit, AfterViewInit{
  public loading = new BehaviorSubject<boolean>(false);
  dataSource = new MatTableDataSource<UserDto>();

  public displayedColumns = ["number", "email", "name", "prename", "phone"];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private rest: UserDtoRestService, public settings: UserDetailsSettingsService) {
  }

  ngOnInit() {
    const subscription = this.rest.getAll().subscribe(data => {
      this.dataSource.data = data;
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
}
