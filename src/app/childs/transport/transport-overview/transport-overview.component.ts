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
    this.database.data = this.getTransports();
  }

  public getTransports(): ITransport[] {
    return [
      new TransportTO(1, new Date('05/01/2000'), 'a x 14'),
      new TransportTO(2, new Date('05/02/2017'), 'a x 24'),
      new TransportTO(3, new Date('05/03/2017'), 'b x 14'),
      new TransportTO(4, new Date('05/04/2017'), 'b x 24'),
      new TransportTO(5, new Date('05/05/2017'), 'c y 15'),
      new TransportTO(6, new Date('05/06/2017'), 'c y 24'),
      new TransportTO(7, new Date('05/07/2017'), 'c y 34'),
      new TransportTO(8, new Date('05/08/2017'), 'd x 24'),
      new TransportTO(9, new Date('05/09/2017'), 'd x 34'),
    ];
  }
}
