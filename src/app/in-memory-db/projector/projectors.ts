import {CModel} from "../model/c/c-model";
import {TModel} from "../model/t/t-id";
import {AbstractProjector} from "./abstract-projector";

export class Projectors {
  private projectors = new Map<typeof CModel, AbstractProjector<any, any>>();

  public get<C extends CModel, T extends TModel>(cType: typeof CModel): AbstractProjector<C, T> {
    return this.projectors.get(cType);
  }

  public add<C extends CModel, T extends TModel>(cType: typeof CModel, projector: AbstractProjector<C, T>): void {
    this.projectors.set(cType, projector);
  }
}
