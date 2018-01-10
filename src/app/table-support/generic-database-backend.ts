import {IId, IOrderDefinitions} from "citrus-common";
import {IWhereDefinition} from "citrus-common/lib/interfaces/IWhereDefinition";
import {Observable} from "rxjs/Observable";
import {ReplaySubject} from "rxjs/ReplaySubject";
import {isUndefined} from "util";
import {GenericCacheAdapterService} from "../cache/generic-cache-adapter.service";
import {InMemoryDatabaseService} from "../in-memory-db/in-memory-database.service";
import {CAddress} from "../in-memory-db/model/c/c-address";
import {Request} from "./../in-memory-db/request/request";
import {GenericDatabaseInterface} from "./generic-database.interface";
import {GenericRestService} from "./generic-rest.service";
import {RangeResult} from "./range-result";

export class GenericDatabaseBackend<T extends IId> implements GenericDatabaseInterface<T> {

  public dataChanged = new ReplaySubject<object>();
  public all: ReplaySubject<T[]>;

  public constructor(private rest: GenericRestService<T>,
                     private cacheAdapter: GenericCacheAdapterService<T>,
                     private inMemoryDb: InMemoryDatabaseService,
                     private filterColumns: string[] = [],
                     private includedTypesAtSelect: string[] = [],
                     private includedTypesAtGet: string[] = []) {
  }

  public select(start: number,
                length: number,
                filter: string,
                order: IOrderDefinitions,
                where: IWhereDefinition): Observable<RangeResult<T>> {
    const subject = new ReplaySubject<RangeResult<T>>();
    const cache = this.cacheAdapter.getRange(start, length, filter, order, where, this.includedTypesAtSelect);
    if (!isUndefined(cache)) {
      subject.next(cache);
    } else {
      const req = new Request("CAddress", [], []);
      this.inMemoryDb.get(req).subscribe(addresses => {
        console.info(addresses);
      });
      this.rest.getRange(start, length, filter, this.filterColumns, order, where, this.includedTypesAtSelect).subscribe((result) => {
        if (!!filter) {
          this.cacheAdapter.updateEntries(result.rows, where); // count == all entries that matches "where condition" and "filter"
        } else {
          this.cacheAdapter.updateEntries(result.rows, where, result.count); // count == all entries that matches "where condition"
        }
        result.rows = this.cacheAdapter.getByIds(result.rows.map((item) => item.id), this.includedTypesAtSelect);
        subject.next(result);
      });
    }
    return subject;
  }

  public get(id: number): Observable<T> {
    const subject = new ReplaySubject<T>();
    const cache = this.cacheAdapter.get(id, this.includedTypesAtGet);
    if (!isUndefined(cache)) {
      subject.next(cache);
    } else {
      this.rest.get(id, this.includedTypesAtGet).subscribe((entry) => {
        this.cacheAdapter.update(entry);
        subject.next(entry);
      });
    }
    return subject;
  }

  public getAll(scopeCondition: IWhereDefinition = {columnName: undefined, id: undefined}): Observable<T[]> {
    if (this.all) {
      return this.all;
    }
    this.all = new ReplaySubject<T[]>();
    const cache = this.cacheAdapter.getAll(this.includedTypesAtSelect, scopeCondition);
    if (!isUndefined(cache)) {
      this.all.next(cache);
    } else {
      this.rest.getAll(this.includedTypesAtSelect, scopeCondition).subscribe((result) => {
        this.cacheAdapter.updateAllEntries(result, scopeCondition);
        this.all.next(this.cacheAdapter.getAll(this.includedTypesAtSelect, scopeCondition));
      });
    }
    return this.all;
  }

  public add(t: T): Observable<T> {
    const subject = new ReplaySubject<T>();
    this.rest.add(t).subscribe((item) => {
      this.cacheAdapter.update(item);
      subject.next(item);
    });
    return subject;
  }

  public remove(id: number): Observable<boolean> {
    const subject = new ReplaySubject<boolean>();
    this.rest.del(id).subscribe((success) => {
      if (success) {
        this.cacheAdapter.remove(id);
      }
      subject.next(success);
    });
    return subject;
  }

  public update(t: T): Observable<boolean> {
    const subject = new ReplaySubject<boolean>();
    this.rest.update(t).subscribe((success) => {
      if (success) {
        this.cacheAdapter.update(t);
      }
      subject.next(success);
    });
    return subject;
  }
}
