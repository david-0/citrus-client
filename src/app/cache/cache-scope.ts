import {IWhereDefinition} from "citrus-common";
import {CacheState} from "./cache-state.enum";

export class CacheScope {
  public state = CacheState.notLoaded;
  constructor(private _scope: IWhereDefinition) {

  }
  public get scope() {
    return this._scope;
  }
}


