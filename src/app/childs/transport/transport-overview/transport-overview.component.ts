import {Component, OnInit, ViewChild} from "@angular/core";
import {MatPaginator, MatSort} from "@angular/material";
import "rxjs/add/observable/fromEvent";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/distinctUntilChanged";
import "rxjs/add/operator/map";
import {ITransport} from "../../../entities/ITransport";
import {GenericPagedDataSource} from "../../../table-support/generic-paged-data-source";
import {TransportDatabaseService} from "../transport-database.service";
import {TransportSettingsService} from "../transport-settings.service";

@Component({
  selector: "app-transport-overview",
  templateUrl: "./transport-overview.component.html",
  styleUrls: ["./transport-overview.component.scss"]
})
export class TransportOverviewComponent implements OnInit {
  public displayedColumns = ["departureDate", "comment"];

  public dataSource: GenericPagedDataSource<ITransport> | null;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private database: TransportDatabaseService, public settings: TransportSettingsService) {
  }

  ngOnInit() {
    this.dataSource = new GenericPagedDataSource(this.database, this.paginator, this.sort, this.settings);
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
