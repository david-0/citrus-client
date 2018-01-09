import {IRequestCondition, IRequestField} from "citrus-common";
import {CModel} from "../model/c/c-model";
import {Request} from "./request";

export class RequestBuilder<T extends CModel> {
  private includedFields: IRequestField[] = [];
  private conditions: IRequestCondition<T>[] = [];

  public constructor(private type: typeof CModel) {
  }

  static createFromRequest<T extends CModel>(request: Request<T>): RequestBuilder<T> {
    return new RequestBuilder(request.type)
      .addFields(request.includedFields)
      .addConditions(request.conditions);
  }

  public addFields(fields: IRequestField[]): RequestBuilder<T> {
    this.includedFields.push(...fields);
    return this;
  }

  public addField(field: IRequestField): RequestBuilder<T> {
    this.includedFields.push(field);
    return this;
  }

  public addCondition(condition: IRequestCondition<T>) {
    this.conditions.push(condition);
    return this;
  }

  public addConditions(conditions: IRequestCondition<T>[]) {
    this.conditions.push(...conditions);
    return this;
  }

  public build(): Request<T> {
    return new Request(this.type, this.includedFields, this.conditions);
  }
}
