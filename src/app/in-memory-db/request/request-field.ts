import {IRequestField} from "citrus-common";

export class RequestField implements IRequestField {
  constructor(public name: string, public type: typeof Object) {
  }

  public toString() {
    return name + ":" + this.type.name;
  }

  public isEquals(field: RequestField): boolean {
    return this.name === field.name && this.type === field.type;
  }
}
