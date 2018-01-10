import {AbstractProjector} from "./abstract-projector";

export class Projectors {
  private projectors = new Map<string, AbstractProjector>();

  public get(typeName: string): AbstractProjector {
    return this.projectors.get(typeName);
  }

  public add(typeName: string, projector: AbstractProjector): void {
    this.projectors.set(typeName, projector);
  }
}
