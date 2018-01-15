import {TypeCache} from "./type-cache";

export class Caches {
  private caches = new Map<string, TypeCache<any>>();

  public getCache(typeName: string): TypeCache<any> {
    return this.caches.get(typeName);
  }

  public addCache(typeName: string, typeCache: TypeCache<any>) {
    return this.caches.set(typeName, typeCache);
  }
}
