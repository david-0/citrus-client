import {Component, OnInit, ViewChild} from '@angular/core';
import {ITransport} from '../../../entities/ITransport';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import {GenericPagedDataSource} from '../../../list-support/generic-paged-data-source';
import {MdPaginator, MdSort} from '@angular/material';
import {TransportDatabaseService} from '../transport-database.service';
import {TransportSettingsService} from '../transport-settings.service';

@Component({
  selector: 'app-overview-transport',
  templateUrl: './transport-overview.component.html',
  styleUrls: ['./transport-overview.component.scss']
})
export class TransportOverviewComponent implements OnInit {
  public displayedColumns = ['id', 'departureDate', 'comment'];

  public dataSource: GenericPagedDataSource<ITransport> | null;

  constructor(private database: TransportDatabaseService, public settings: TransportSettingsService) {
  }

  @ViewChild(MdPaginator) paginator: MdPaginator;
  @ViewChild(MdSort) sort: MdSort;

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
