import {IRequestField} from "citrus-common";

export class RequestField implements IRequestField {
  constructor(public fieldName: string, public typeName: string) {
  }

  public toString() {
    return name + ":" + this.typeName;
  }

  public isEquals(field: RequestField): boolean {
    return this.fieldName === field.fieldName && this.typeName === field.typeName;
  }
}
