import {CModel} from "../model/c/c-model";
import {TypeCache} from "./type-cache";

export class Caches {
  private caches = new Map<string, TypeCache<any>>();

  public getCache(typeName: string) {
    return this.caches.get(name);
  }

  public addCache(typeName: string, typeCache: TypeCache<any>) {
    return this.caches.set(name, typeCache);
  }
}
