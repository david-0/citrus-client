import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {GenericDatabase} from '../../../list-support/generic-database';
import {ITransport} from '../../../entities/ITransport';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import {GenericPagedDataSource} from '../../../list-support/generic-paged-data-source';
import {MdPaginator, MdSort} from '@angular/material';
import {TransportTO} from '../../../TransferObjects/TransportTO';
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

  constructor(private database: TransportDatabaseService, private settings: TransportSettingsService) {
  }

  @ViewChild('filter') filter: ElementRef;
  @ViewChild(MdPaginator) paginator: MdPaginator;
  @ViewChild(MdSort) sort: MdSort;

  ngOnInit() {
    this.filter.nativeElement.value = this.settings.filterValue;
    this.dataSource = new GenericPagedDataSource(this.database, this.paginator, this.sort, this.settings);
    this.dataSource.filter = this.filter.nativeElement.value;
    Observable.fromEvent(this.filter.nativeElement, 'keyup')
      .debounceTime(150)
      .distinctUntilChanged()
      .subscribe(() => {
        if (!this.dataSource) {
          return;
        }
        this.dataSource.filter = this.filter.nativeElement.value;
        this.settings.filterValue = this.filter.nativeElement.value;
      });
    this.paginator.page.subscribe(event => {
      this.settings.pageIndex = event.pageIndex;
      this.settings.pageSize = event.pageSize;
    });
  }
}
