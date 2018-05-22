import {Component, Input, OnInit, ViewChild} from "@angular/core";
import {MatPaginator, MatSort} from "@angular/material";
import {AddressDto, IWhereDefinition} from "citrus-common";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {GenericPagedDataSource} from "../../../table-support/generic-paged-data-source";
import {AddressDatabaseService} from "../address-database.service";
import {AddressSettingsService} from "../address-settings.service";

@Component({
  selector: "app-address-table",
  templateUrl: "./address-table.component.html",
  styleUrls: ["./address-table.component.scss"]
})
export class AddressTableComponent implements OnInit {

  public dataSource: GenericPagedDataSource<AddressDto> | null;
  public loading = new BehaviorSubject<boolean>(false);

  @Input() displayedColumns: string[];
  @Input() whereDefinition: IWhereDefinition = {columnName: undefined, id: undefined};
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private database: AddressDatabaseService, public settings: AddressSettingsService) {
  }

  ngOnInit() {
    this.dataSource = new GenericPagedDataSource(this.database, this.paginator, this.sort, this.settings, this.loading);
    this.dataSource.where = this.whereDefinition;
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
