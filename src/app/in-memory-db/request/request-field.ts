import {IRequestField} from "citrus-common";

export class RequestField implements IRequestField {
  constructor(public readonly fieldName: string, public readonly typeName: string) {
  }

  public toString() {
    return this.fieldName + ":" + this.typeName;
  }

  public isEquals(field: RequestField): boolean {
    return this.fieldName === field.fieldName && this.typeName === field.typeName;
  }
}
