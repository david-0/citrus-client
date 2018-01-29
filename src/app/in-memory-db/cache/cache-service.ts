import {Injectable} from "@angular/core";
import {TypeCache} from "./type-cache";

@Injectable()
export class CacheService {

  constructor() {
    this.addCache("Address", new TypeCache());
    this.addCache("User", new TypeCache());
  }

  private caches = new Map<string, TypeCache<any>>();

  public getCache(typeName: string): TypeCache<any> {
    return this.caches.get(typeName);
  }

  public addCache(typeName: string, typeCache: TypeCache<any>) {
    return this.caches.set(typeName, typeCache);
  }
}
