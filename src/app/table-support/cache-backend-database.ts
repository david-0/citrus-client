import {IId, IOrderDefinitions} from "citrus-common";
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";
import {isUndefined} from "util";
import {GenericDatabaseInterface} from "./generic-database.interface";
import {GenericRestService} from "./generic-rest.service";
import {RangeResult} from "./range-result";

export class CacheBackendDatabase<T extends IId> implements GenericDatabaseInterface<T> {

  public dataChanged = new Subject<object>();
  private state = CacheState.notLoaded;
  private cache = new Map<number, T>();

  public constructor(private rest: GenericRestService<T>, private filterFunction: (t: T) => boolean,
                     private compareFunction: (a: T, b: T, order: IOrderDefinitions) => number) {
  }

  public select(start: number,
                length: number,
                filter: string,
                order: IOrderDefinitions): Observable<RangeResult<T>> {
    const subject = new Subject<RangeResult<T>>();
    if (this.state !== CacheState.fullyLoaded) {
      this.rest.getRange(start, length, filter, order).subscribe((rangeResult) => {
        rangeResult.rows.forEach((t) => {
          this.cache.set(t.id, t);
        });
        if (rangeResult.count === this.cache.size) {
          this.state = CacheState.fullyLoaded;
        } else {
          this.state = CacheState.partiallyLoaded;
        }
        this.dataChanged.next(new Object());
        subject.next(rangeResult);
      });
    } else {
      const values = Array.from(this.cache.values());
      const filteredvalues = values.filter(this.filterFunction);
      values.sort((a, b) => this.compareFunction(a, b, order));
      subject.next(new RangeResult(values, this.cache.size));
    }
    return subject;
  }

  public get(id: number): Observable<T> {
    const value = this.cache.get(id);
    if (isUndefined(value)) {
      return this.getAndUpdateCache(id);
    }
    return Observable.create(observer => {
      observer.next(value);
    });
  }

  private getAndUpdateCache(id: number): Observable<T> {
    const subject = new Subject<T>();
    this.rest.get(id).subscribe((t) => {
      if (this.state !== CacheState.fullyLoaded) {
        this.state = CacheState.partiallyLoaded;
      }
      this.cache.set(t.id, t);
      this.dataChanged.next(new Object());
      subject.next(t);
    });
    return subject;
  }

  public getAll(): Observable<T[]> {
    const subject = new Subject<T[]>();
    if (this.state === CacheState.fullyLoaded) {
      subject.next(Array.from(this.cache.values()));
    } else {
      // TODO: subscribe to Socket.IO for all updates
      this.rest.getAll().subscribe((list) => {
        list.forEach((t) => {
          this.cache.set(t.id, t);
        });
        this.dataChanged.next(new Object());
        this.state = CacheState.fullyLoaded;
        subject.next(Array.from(this.cache.values()));
      });
    }
    return subject;
  }

  public add(t: T): Observable<T> {
    const subject = new Subject<T>();
    this.rest.add(t).subscribe((item) => {
      this.cache.set(item.id, item);
      if (this.state === CacheState.notLoaded) {
        this.state = CacheState.partiallyLoaded;
      }
      subject.next(item);
    }, (msg) => {
      subject.error(`Error during add: ${msg}`);
    });
    return subject;
  }

  public remove(id: number): Observable<boolean> {
    const subject = new Subject<boolean>();
    this.rest.del(id).subscribe((item) => {
      this.cache.delete(id);
      subject.next(item);
    }, (msg) => {
      subject.error(`Error during update: ${msg}`);
    });
    return subject;
  }

  public update(t: T): Observable<boolean> {
    const subject = new Subject<boolean>();
    this.rest.update(t).subscribe((item) => {
      this.cache.set(t.id, t);
      subject.next(item);
    }, (msg) => {
      subject.error(`Error during update: ${msg}`);
    });
    return subject;
  }

  private processItem() {

  }
}

enum CacheState {
  notLoaded,
  partiallyLoaded,
  fullyLoaded,
}

