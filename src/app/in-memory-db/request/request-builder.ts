import {IRequestCondition, IRequestField} from "citrus-common";
import {Request} from "./request";

export class RequestBuilder {
  private includedFields: IRequestField[] = [];
  private conditions: IRequestCondition[] = [];

  public constructor(private typeName: string) {
  }

  static createFromRequest(request: Request): RequestBuilder {
    return new RequestBuilder(request.typeName)
      .addFields(request.includedFields)
      .addConditions(request.conditions);
  }

  public addFields(fields: IRequestField[]): RequestBuilder {
    this.includedFields.push(...fields);
    return this;
  }

  public addField(field: IRequestField): RequestBuilder {
    this.includedFields.push(field);
    return this;
  }

  public addCondition(condition: IRequestCondition) {
    this.conditions.push(condition);
    return this;
  }

  public addConditions(conditions: IRequestCondition[]) {
    this.conditions.push(...conditions);
    return this;
  }

  public build(): Request {
    return new Request(this.typeName, this.includedFields, this.conditions);
  }
}
