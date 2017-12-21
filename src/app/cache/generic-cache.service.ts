import {IId, IOrderDefinitions} from "citrus-common";
import {IWhereDefinition} from "citrus-common/lib/interfaces/IWhereDefinition";
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";
import {isUndefined} from "util";
import {RangeResult} from "../table-support/range-result";
import {CacheScope} from "./cache-scope";
import {CacheState} from "./cache-state.enum";
import {ScopeMap} from "./scope-map";

export abstract class GenericCacheService<T extends IId> {
  private _dataChanged = new Subject<object>();
  private cache = new Map<number, T>();
  private scopes = new ScopeMap();

  constructor() {
  }

  public isFullyLoaded(scopeCondition: IWhereDefinition = null): boolean {
    if (this.scopes.has(scopeCondition)) {
      return this.scopes.get(scopeCondition).state === CacheState.fullyLoaded;
    }
    return false;
  }

  public setCacheState(cacheState: CacheState, scopeCondition: IWhereDefinition = null): void {
    let scope = this.scopes.get(scopeCondition);
    if (isUndefined(scope)) {
      scope = new CacheScope(scopeCondition);
      this.scopes.set(scopeCondition, scope);
    }
    scope.state = cacheState;
  }

  public setPartiallyLoaded(scopeCondition: IWhereDefinition = null): void {
    this.setCacheState(CacheState.partiallyLoaded, scopeCondition);
  }

  public setFullyLoaded(scopeCondition: IWhereDefinition = null): void {
    this.setCacheState(CacheState.fullyLoaded, scopeCondition);
  }

  public setNotLoaded(scopeCondition: IWhereDefinition = null): void {
    this.setCacheState(CacheState.notLoaded, scopeCondition);
  }

  public get dataChanged(): Observable<object> {
    return this._dataChanged;
  }

  public get(id: number): T | undefined {
    return this.cache.get(id);
  }

  public getAll(scopeCondition: IWhereDefinition): T[] | undefined {
    if (this.isFullyLoaded(scopeCondition)) {
      return this.getScopedItems(scopeCondition);
    }
    return undefined;
  }

  public getRange(offset: number, limit: number, filter: string, order: IOrderDefinitions,
                  where: IWhereDefinition): RangeResult<T> {
    if (this.isFullyLoaded(where)) {
      const scopedValues = this.getScopedItems(where);
      const filteredValues = scopedValues.filter((t) => this.filterFunction(t, filter));
      filteredValues.sort((a, b) => this.compareFunction(a, b, order));
      return new RangeResult(filteredValues, this.cache.size);
    }
    return undefined;
  }

  public updateEntries(items: T[], scopeCondition: IWhereDefinition = null, countIfAllLoaded: number = -1) {
    this.updateItems(items);
    if (!this.isFullyLoaded(scopeCondition)) {
      if (this.getScopedItems(scopeCondition).length === countIfAllLoaded) {
        this.setFullyLoaded(scopeCondition);
      } else {
        this.setPartiallyLoaded(scopeCondition);
      }
    }
  }

  public updateAllEntries(items: T[], scopeCondition: IWhereDefinition = null) {
    this.updateItems(items);
    this.setFullyLoaded(scopeCondition);
  }

  public update(t: T) {
    this.updateEntries([t], {columnName: undefined, id: undefined});
  }

  public remove(id: number) {
    const cache = this.cache.get(id);
    if (!isUndefined(cache)) {
      this.cache.delete(id);
      this._dataChanged.next(new Object());
    }
  }

  private getScopedItems(where: IWhereDefinition): T[] {
    const values = Array.from(this.cache.values());
    if (!isUndefined(where)) {
      return values.filter((t) => this.whereFunction(t, where.columnName, where.id));
    }
    return values;
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

  private whereFunction(item: T, columnName: string, id: number) {
    if (!columnName || !id) {
      return true;
    }
    return Object.getOwnPropertyNames(item)
      .filter(name => name === columnName)
      .map((name) => Object.getOwnPropertyDescriptor(item, name).value)
      .filter(value => value === id)
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
            compareResult = definition.direction === "asc" ? compareValue : compareValue * -1;
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
}
