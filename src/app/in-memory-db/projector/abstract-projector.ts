import {Caches} from "../cache/caches";
import {Projectors} from "./projectors";

export abstract class AbstractProjector {
  constructor(protected readonly caches: Caches, protected readonly projectors: Projectors) {
  }

  public abstract projectOneAndUpdateCache(tItem: any): any;

  public projectManyAndUpdateCache(tItems: any[]): any[] {
    return tItems.map(tItem => this.projectOneAndUpdateCache(tItem));
  }
}
