import {CModel} from "../model/c/c-model";
import {TypeCache} from "./type-cache";

export class Caches {
  private caches = new Map<typeof CModel, TypeCache<any>>();

  public getCache(name: typeof CModel) {
    return this.caches.get(name);
  }

  public addCache(name: typeof CModel, typeCache: TypeCache<any>) {
    return this.caches.set(name, typeCache);
  }
}
