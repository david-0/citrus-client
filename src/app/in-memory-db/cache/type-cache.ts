import {isUndefined} from "util";
import {CModel} from "../model/c/c-model";

export class TypeCache<C extends CModel> {
  private cache = new Map<number, C>();

  public has(id: number): boolean {
    return this.cache.has(id);
  }

  public get(id: number): C {
    return this.cache.get(id);
  }

  public getAll(): C[] {
    return Array.from(this.cache.values());
  }

  public synchronizeMany(items: C[]): C[] {
    return items.filter(item => item).map(item => this.synchronizeOne(item));
  }

  public set(id: number, t: C) {
    this.cache.set(id, t);
  }

  public delete(id: number): boolean {
    return this.cache.delete(id);
  }

  public synchronizeOne(item: C): C {
    const cacheEntry = this.cache.get(item.id);
    if (isUndefined(cacheEntry)) {
      this.cache.set(item.id, item);
      return item;
    }
    this.projectItem(cacheEntry, item);
    return cacheEntry;
  }

  private projectItem(cacheItem: C, item: C): boolean {
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
}
