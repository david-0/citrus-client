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

@Component({
  selector: 'app-overview-transport',
  templateUrl: './transport-overview.component.html',
  styleUrls: ['./transport-overview.component.scss']
})
export class TransportOverviewComponent implements OnInit {
  public displayedColumns = ['id', 'departureDate', 'comment'];

  public dataSource: GenericPagedDataSource<ITransport> | null;

  constructor(private database: TransportDatabaseService) { }

  @ViewChild('filter') filter: ElementRef;
  @ViewChild(MdPaginator) paginator: MdPaginator;
  @ViewChild(MdSort) sort: MdSort;

  ngOnInit() {
    this.dataSource = new GenericPagedDataSource(this.database, this.paginator, this.sort);
    Observable.fromEvent(this.filter.nativeElement, 'keyup')
      .debounceTime(150)
      .distinctUntilChanged()
      .subscribe(() => {
        if (!this.dataSource) { return; }
        this.dataSource.filter = this.filter.nativeElement.value;
      });
  }

}
