import {IId, IOrderDefinitions} from "citrus-common";
import {IWhereDefinition} from "citrus-common/lib/interfaces/IWhereDefinition";
import {Observable} from "rxjs/Observable";
import {ReplaySubject} from "rxjs/ReplaySubject";
import {isUndefined} from "util";
import {GenericCacheAdapterService} from "../cache/generic-cache-adapter.service";
import {GenericDatabaseInterface} from "./generic-database.interface";
import {GenericRestService} from "./generic-rest.service";
import {RangeResult} from "./range-result";

export class GenericDatabaseBackend<T extends IId> implements GenericDatabaseInterface<T> {

  public dataChanged = new ReplaySubject<object>();
  public all: ReplaySubject<T[]>;

  public constructor(private rest: GenericRestService<T>,
                     private cache: GenericCacheAdapterService<T>,
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
    const cache = this.cache.getRange(start, length, filter, order, where, this.includedTypesAtSelect);
    if (!isUndefined(cache)) {
      subject.next(cache);
    } else {
      this.rest.getRange(start, length, filter, this.filterColumns, order, where, this.includedTypesAtSelect).subscribe((result) => {
        this.cache.updateEntries(result.rows, result.count);
        result.rows = this.cache.getByIds(result.rows.map((item) => item.id), this.includedTypesAtSelect);
        subject.next(result);
      });
    }
    return subject;
  }

  public get(id: number): Observable<T> {
    const subject = new ReplaySubject<T>();
    const cache = this.cache.get(id, this.includedTypesAtGet);
    if (!isUndefined(cache)) {
      subject.next(cache);
    } else {
      this.rest.get(id, this.includedTypesAtGet).subscribe((entry) => {
        this.cache.update(entry);
        subject.next(entry);
      });
    }
    return subject;
  }

  public getAll(): Observable<T[]> {
    if (this.all) {
      return this.all;
    }
    this.all = new ReplaySubject<T[]>()
    const cache = this.cache.getAll(this.includedTypesAtSelect);
    if (!isUndefined(cache)) {
      this.all.next(cache);
    } else {
      this.rest.getAll(this.includedTypesAtSelect).subscribe((result) => {
        this.cache.updateEntries(result, result.length);
        this.all.next(this.cache.getAll(this.includedTypesAtSelect));
      });
    }
    return this.all;
  }

  public add(t: T): Observable<T> {
    const subject = new ReplaySubject<T>();
    this.rest.add(t).subscribe((item) => {
      this.cache.update(item);
      subject.next(item);
    });
    return subject;
  }

  public remove(id: number): Observable<boolean> {
    const subject = new ReplaySubject<boolean>();
    this.rest.del(id).subscribe((success) => {
      if (success) {
        this.cache.remove(id);
      }
      subject.next(success);
    });
    return subject;
  }

  public update(t: T): Observable<boolean> {
    const subject = new ReplaySubject<boolean>();
    this.rest.update(t).subscribe((success) => {
      if (success) {
        this.cache.update(t);
      }
      subject.next(success);
    });
    return subject;
  }
}
