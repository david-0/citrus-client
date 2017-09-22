import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs/Observable';
import {GenericDatabase} from './generic-database';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import {MdPaginator, MdSort} from '@angular/material';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

export class GenericPagedDataSource<T> extends DataSource<T> {

  private filterChange = new BehaviorSubject('');

  public get filter(): string {
    return this.filterChange.value;
  }

  public set filter(filter: string) {
    this.paginator.pageIndex = 0;
    this.filterChange.next(filter);
  }

  constructor(private database: GenericDatabase<T>,
              private paginator: MdPaginator,
              private sort: MdSort) {
    super();
  }

  connect(collectionViewer: CollectionViewer): Observable<T[]> {
    const displayDataChanges = [
      this.database.dataChange,
      this.filterChange,
      this.paginator.page,
      this.sort.mdSortChange,
    ];

    return Observable.merge(...displayDataChanges).map(() => {
      let order: { column: string, direction: string }[] = [];
      if (this.sort.direction !== '') {
        order = [{column: this.sort.active, direction: this.sort.direction}];
      }
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      this.paginator.length = this.database.numberOfItems(this.filterChange.value);
      return this.database.select(startIndex, this.paginator.pageSize, this.filterChange.value, order);
    });
  }

  disconnect(collectionViewer: CollectionViewer): void {
  }
}
