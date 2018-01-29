import {CacheService} from "../cache/cache-service";
import {ProjectorService} from "./projector.service";

export abstract class AbstractProjector {
  constructor(protected readonly caches: CacheService, protected readonly projectors: ProjectorService) {
  }

  public abstract projectOneAndUpdateCache(tItem: any): any;

  public projectManyAndUpdateCache(tItems: any[]): any[] {
    return tItems.map(tItem => this.projectOneAndUpdateCache(tItem));
  }
}
