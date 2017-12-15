import {IId, IOrderDefinitions} from "citrus-common";
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";
import {isUndefined} from "util";
import {RangeResult} from "../table-support/range-result";

export abstract class GenericCacheService<T extends IId> {
  private _dataChanged = new Subject<object>();
  private state = CacheState.notLoaded;
  private cache = new Map<number, T>();

  constructor() {
  }

  public get dataChanged(): Observable<object> {
    return this._dataChanged;
  }

  public get(id: number): T | undefined {
    return this.cache.get(id);
  }

  public getAll(): T[] | undefined {
    if (this.state === CacheState.fullyLoaded) {
      return Array.from(this.cache.values());
    }
    return undefined;
  }

  public getRange(offset: number, limit: number, filter: string, order: IOrderDefinitions): RangeResult<T> {
    if (this.state === CacheState.fullyLoaded) {
      const values = Array.from(this.cache.values());
      const filteredvalues = values.filter((t) => this.filterFunction(t, filter));
      filteredvalues.sort((a, b) => this.compareFunction(a, b, order));
      return new RangeResult(filteredvalues, this.cache.size);
    }
    return undefined;
  }

  public updateEntries(items: T[], countIfAllLoaded: number = -1) {
    this.updateItems(items);
    this.updateState(countIfAllLoaded);
  }

  public update(t: T) {
    this.updateEntries([t], -1);
  }

  public remove(id: number) {
    const cache = this.cache.get(id);
    if (!isUndefined(cache)) {
      this.cache.delete(id);
      this._dataChanged.next(new Object());
    }
  }

  private projectItem(cacheItem: T, item: T): boolean {
    let changed = false;
    const itemPropertyNames = Object.getOwnPropertyNames(item);
    itemPropertyNames.forEach((name) => {
      const itemDesc = Object.getOwnPropertyDescriptor(item, name);
      const itemValue = itemDesc.value;
      if (!isUndefined(itemValue) && itemValue !== cacheItem[name]) {
        cacheItem[name] = itemValue;
        changed = true;
      }
    });
    return changed;
  }

  private filterFunction(item: T, filter: string): boolean {
    if (!filter) {
      return true;
    }
    return Object.getOwnPropertyNames(item)
      .map((name) => Object.getOwnPropertyDescriptor(item, name).value)
      .filter((value) => !isUndefined(value))
      .filter((value) => value !== null)
      .map(value => value.toString())
      .filter((value) => value.indexOf(filter) > -1)
      .length > 0;
  }

  private compareFunction(a: T, b: T, order: IOrderDefinitions): number {
    let compareResult = 0;
    order.definitions.forEach(definition => {
      const valueA = a[definition.columnName];
      const valueB = b[definition.columnName];
      if (!!valueA && !!valueB) {
        if (typeof valueA === "string") {
          const compareValue = valueA.localeCompare(valueB);
          if (compareValue !== 0) {
            compareResult =  definition.direction === "asc" ? compareValue : compareValue * -1;
          }
        }
        if (typeof valueA === "number") {
          const compareValue = valueA - valueB;
          if (compareValue !== 0) {
            compareResult = definition.direction === "asc" ? compareValue : compareValue * -1;
          }
        }
      }
    });
    return compareResult;
  }

  private updateItems(list: T[]): boolean {
    let changed = false;
    list.filter(item => item).forEach((t) => {
      const cacheEntry = this.cache.get(t.id);
      if (isUndefined(cacheEntry)) {
        this.cache.set(t.id, t);
        changed = true;
      } else {
        changed = this.projectItem(cacheEntry, t);
      }
    });
    return changed;
  }

  private updateState(count: number) {
    if (this.state === CacheState.fullyLoaded || count === this.cache.size) {
      this.state = CacheState.fullyLoaded;
    } else {
      this.state = CacheState.partiallyLoaded;
    }
    this._dataChanged.next(new Object());
  }

}

enum CacheState {
  notLoaded,
  partiallyLoaded,
  fullyLoaded,
}
