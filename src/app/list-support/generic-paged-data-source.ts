import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs/Observable';
import {GenericDatabase} from './generic-database';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import {MdPaginator, MdSort} from '@angular/material';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {IId} from '../entities/IId';
import {SettingsServiceInterface} from './settings-service-interface';

export class GenericPagedDataSource<T extends IId> extends DataSource<T> {

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
              private sort: MdSort,
              private settings: SettingsServiceInterface) {
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
      this.paginator.pageSize = this.settings.pageSize;
      this.setPageIndex();
      return this.database.select(startIndex, this.paginator.pageSize, this.filterChange.value, order);
    });
  }

  disconnect(collectionViewer: CollectionViewer): void {
  }

  private setPageIndex() {
    for (let i = 0; i < this.settings.pageIndex; i++) {
      if (this.paginator.hasNextPage()) {
        this.paginator.pageIndex = this.settings.pageIndex;
      }
    }
    this.settings.pageIndex = this.paginator.pageIndex;
  }
}
