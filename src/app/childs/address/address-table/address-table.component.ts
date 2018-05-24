import {Component, Input, OnInit, ViewChild} from "@angular/core";
import {MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {AddressDto} from "citrus-common";
import {AddressDtoRestService} from "../address-dto-rest.service";
import {AddressSettingsService} from "../address-settings.service";

@Component({
  selector: "app-address-table",
  templateUrl: "./address-table.component.html",
  styleUrls: ["./address-table.component.scss"]
})
export class AddressTableComponent implements OnInit {

  datasource = new MatTableDataSource<AddressDto>();
  @Input() displayedColumns: string[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private rest: AddressDtoRestService, public settings: AddressSettingsService) {
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
