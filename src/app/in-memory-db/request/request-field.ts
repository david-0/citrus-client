import {IRequestField} from "citrus-common";

export class RequestField implements IRequestField {
  constructor(public name: string, public typeName: string) {
  }

  public toString() {
    return name + ":" + this.typeName;
  }

  public isEquals(field: RequestField): boolean {
    return this.name === field.name && this.typeName === field.typeName;
  }
}
