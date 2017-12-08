import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import {MatPaginator, MatSort} from "@angular/material";
import {IId} from "citrus-common";
import "rxjs/add/observable/merge";
import "rxjs/add/operator/mergeMap";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Observable} from "rxjs/Observable";
import {OrderDefinition} from "../TransferObjects/OrderDefinition";
import {OrderDefinitions} from "../TransferObjects/OrderDefinitions";
import {GenericDatabaseInterface} from "./generic-database.interface";
import {SettingsServiceInterface} from "./settings-service-interface";

export class GenericPagedDataSource<T extends IId> extends DataSource<T> {

  private filterChange = new BehaviorSubject("");

  constructor(private database: GenericDatabaseInterface<T>,
              private paginator: MatPaginator,
              private sort: MatSort,
              private settings: SettingsServiceInterface,
              private loading: BehaviorSubject<boolean> = null) {
    super();
  }

  public get filter(): string {
    return this.filterChange.value;
  }

  public set filter(filter: string) {
    this.paginator.pageIndex = 0;
    this.filterChange.next(filter);
  }

  public test(t: [number]) {
    return null;
  }

  connect(collectionViewer: CollectionViewer): Observable<T[]> {
    const displayDataChanges = [
      this.database.dataChange,
      this.filterChange,
      this.paginator.page,
      this.sort.sortChange,
    ];

    return Observable.merge(...displayDataChanges).mergeMap(() => {
      this.setLoading(true);
      const t: { id: number }[] = [];

      const order = new OrderDefinitions();
      if (this.sort.direction !== "") {
        order.definitions.push( new OrderDefinition(this.sort.active, this.sort.direction));
      }
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return this.database.select(startIndex, this.paginator.pageSize, this.filterChange.value, order).map((result) => {
        this.paginator.length = result.count;
        this.paginator.pageSize = this.settings.pageSize;
        this.setPageIndex();
        this.setLoading(false);
        return result.rows;
      });
    });
  }

  private setLoading(loading: boolean) {
    if (this.loading && this.loading.getValue() != loading) {
      this.loading.next(loading);
    }
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
