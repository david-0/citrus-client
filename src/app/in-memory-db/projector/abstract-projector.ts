import {Caches} from "../cache/caches";
import {Projectors} from "./projectors";

export abstract class AbstractProjector {
  constructor(private _caches: Caches, private _projectors: Projectors) {
  }

  public abstract projectOneAndUpdateCache(tItem: any): any;

  public projectManyAndUpdateCache(tItems: any[]): any[] {
    return tItems.map(tItem => this.projectOneAndUpdateCache(tItem));
  }

  protected get caches() {
    return this._caches;
  }

  protected  get projectors() {
    return this._projectors;
  }
}
