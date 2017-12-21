import {Injectable} from "@angular/core";
import {IId, IOrderDefinitions} from "citrus-common";
import {IWhereDefinition} from "citrus-common/lib/interfaces/IWhereDefinition";
import {isUndefined} from "util";
import {RangeResult} from "../table-support/range-result";
import {GenericCacheService} from "./generic-cache.service";

@Injectable()
export abstract class GenericCacheAdapterService<T extends IId> {

  constructor(protected cache: GenericCacheService<T>) {
  }

  public get(id: number, includedTypes: string[] = []): T | undefined {
    const cacheItem = this.cache.get(id);
    if (!!cacheItem) {
      if (this.areTypesLoaded([cacheItem], includedTypes)) {
        return cacheItem;
      } else {
        if (this.fetchChilds(cacheItem)) {
          return cacheItem;
        }
      }
    }
    return undefined;
  }

  public getAll(includedTypes: string[], scopeCondition: IWhereDefinition): T[] | undefined {
    const cacheItems = this.cache.getAll(scopeCondition);
    if (!isUndefined(cacheItems) && this.areTypesLoaded(cacheItems, includedTypes)) {
      return cacheItems;
    }
    return undefined;
  }

  public getByIds(ids: number[], includedTypes: string[] = []): T[] | undefined {
    return ids.map(id => this.get(id)).filter(cacheItem => cacheItem);
  }

  public getRange(offset: number, limit: number, filter: string, order: IOrderDefinitions,
                  where: IWhereDefinition, includedTypes: string[]): RangeResult<T> {
    const cacheItems = this.cache.getRange(offset, limit, filter, order, where);
    if (!isUndefined(cacheItems) && this.areTypesLoaded(cacheItems.rows, includedTypes)) {
      return cacheItems;
    }
    return undefined;
  }

  public updateEntries(items: T[], scopeCondition: IWhereDefinition = null, countIfAllLoaded: number = -1) {
    items.forEach((item) => {
      this.updateChilds(item);
    });
    this.cache.updateEntries(items, scopeCondition, countIfAllLoaded);
  }

  public updateAllEntries(items: T[], scopeCondition: IWhereDefinition = null) {
    items.forEach((item) => {
      this.updateChilds(item);
    });
    this.cache.updateAllEntries(items, scopeCondition);
  }

  public update(t: T) {
    this.updateChilds(t);
    this.cache.update(t);
  }

  public remove(id: number) {
    return this.cache.remove(id);
  }

  protected abstract fetchChilds(item: T): boolean;

  protected abstract updateChilds(item: T);

  protected abstract loadedTypes(item: T): string[];

  private areTypesLoaded(items: T[], types: string[]): boolean {
    let ret = true;
    items.forEach((item) => {
      const loadedTypes = this.loadedTypes(item);
      types.forEach((type) => {
        if (!loadedTypes.includes(type)) {
          ret = false;
        }
      });
    });
    return ret;
  }
}
