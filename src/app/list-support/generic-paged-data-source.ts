import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs/Observable';
import {GenericDatabase} from './generic-database';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import {MdPaginator} from '@angular/material';

export class GenericPagedDataSource<T> extends DataSource<T> {

  public get filter(): string {
    return this.database.filter;
  }

  public set filter(filter: string) {
    this.database.filter = filter;
  }

  constructor(private database: GenericDatabase<T>,
              private paginator: MdPaginator) {
    super();
  }

  connect(collectionViewer: CollectionViewer): Observable<T[]> {
    const displayDataChanges = [
      this.database.dataChange,
      this.paginator.page,
    ];

    // Grab the page's slice of data.
    return Observable.merge(...displayDataChanges).map(() => {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return this.database.select(startIndex, this.paginator.pageSize);
//      const data = this.database.data.slice().filter(item => this.filterCallback(item, this.filterChange.value));
//      return data.splice(startIndex, this.paginator.pageSize);
    });
  }

  disconnect(collectionViewer: CollectionViewer): void {
  }
}
