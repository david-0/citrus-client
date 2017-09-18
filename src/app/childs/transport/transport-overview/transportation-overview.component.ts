import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {GenericDatabase} from '../../../list-support/generic-database';
import {ITransport} from '../../../entities/ITransport';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import {GenericPagedDataSource} from '../../../list-support/generic-paged-data-source';
import {MdPaginator} from '@angular/material';
import {TransportTO} from '../../../TransferObjects/TransportTO';

@Component({
  selector: 'app-transportation-overview',
  templateUrl: './transportation-overview.component.html',
  styleUrls: ['./transportation-overview.component.scss']
})
export class TransportationOverviewComponent implements OnInit {
  public displayedColumns = ['id', 'departureDate', 'comment'];

  database = new GenericDatabase<ITransport>(false, this.filterCallback);
  public dataSource: GenericPagedDataSource<ITransport> | null;

  constructor() { }

  @ViewChild('filter') filter: ElementRef;
  @ViewChild(MdPaginator) paginator: MdPaginator;

  ngOnInit() {
    this.dataSource = new GenericPagedDataSource(this.database, this.paginator);
    Observable.fromEvent(this.filter.nativeElement, 'keyup')
      .debounceTime(150)
      .distinctUntilChanged()
      .subscribe(() => {
        if (!this.dataSource) { return; }
        this.dataSource.filter = this.filter.nativeElement.value;
      });
    this.database.inputData = this.getTransports();
  }

  public filterCallback(item: ITransport, filterValue: string): boolean {
    return item.comment.toUpperCase().indexOf(filterValue.toUpperCase()) > -1;
  }

  public getTransports(): ITransport[] {
    return [
      new TransportTO(1, new Date('05/01/2000'), 'comment1'),
      new TransportTO(2, new Date('05/02/2017'), 'comment2'),
      new TransportTO(3, new Date('05/03/2017'), 'comment3'),
      new TransportTO(4, new Date('05/04/2017'), 'comment4'),
      new TransportTO(5, new Date('05/05/2017'), 'co5'),
      new TransportTO(6, new Date('05/06/2017'), 'co6'),
      new TransportTO(7, new Date('05/07/2017'), 'no7'),
      new TransportTO(8, new Date('05/08/2017'), 'no8'),
      new TransportTO(9, new Date('05/09/2017'), 'no9'),
    ];
  }
}
