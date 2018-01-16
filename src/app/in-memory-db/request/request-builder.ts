import {IOrderDefinition, IRequestCondition, IRequestField} from "citrus-common";
import {Request} from "./request";

export class RequestBuilder {
  private includedFields: IRequestField[] = [];
  private conditions: IRequestCondition[] = [];
  private order?: IOrderDefinition[];
  private limit?: number;
  private offset?: number;

  public constructor(private typeName: string) {
  }

  static createFromRequest(request: Request): RequestBuilder {
    const rb = new RequestBuilder(request.typeName)
      .addFields(request.includedFields)
      .addConditions(request.conditions);
    if (!!request.order) {
      rb.addOrder(request.order);
    }
    if (!!request.limit) {
      rb.addLimit(request.limit);
    }
    if (!!request.offset) {
      rb.addOffset(request.offset);
    }
    return rb;
  }

  public addFields(fields: IRequestField[]): RequestBuilder {
    this.includedFields.push(...fields);
    return this;
  }

  public addField(field: IRequestField): RequestBuilder {
    this.includedFields.push(field);
    return this;
  }

  public addCondition(condition: IRequestCondition): RequestBuilder {
    this.conditions.push(condition);
    return this;
  }

  public addConditions(conditions: IRequestCondition[]): RequestBuilder {
    this.conditions.push(...conditions);
    return this;
  }

  public addOrder(order: IOrderDefinition[]): RequestBuilder {
    this.order.push(...order);
    return this;
  }

  public addLimit(limit: number): RequestBuilder {
    this.limit = limit;
    return this;
  }

  public addOffset(offset: number): RequestBuilder {
    this.offset = offset;
    return this;
  }

  public build(): Request {
    return new Request(this.typeName, this.includedFields, this.conditions);
  }
}
