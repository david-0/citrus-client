import {CModel} from "../model/c/c-model";
import {Caches} from "../cache/caches";
import {TModel} from "../model/t/t-id";
import {Projectors} from "./projectors";

export abstract class AbstractProjector<C extends CModel, T extends TModel> {
  constructor(private _caches: Caches, private _projectors: Projectors) {
  }

  public abstract projectOneAndUpdateCache(tItem: T): C;

  public projectManyAndUpdateCache(tItems: T[]): C[] {
    return tItems.map(tItem => this.projectOneAndUpdateCache(tItem));
  }

  protected get caches() {
    return this._caches;
  }

  protected  get projectors() {
    return this._projectors;
  }
}
