import {IOrderDefinition, IRequestCondition, IRequestField} from "citrus-common";
import {Request} from "./request";

export class RequestBuilder {
  private includedFields: IRequestField[] = [];
  private condition: IRequestCondition;
  private order?: IOrderDefinition[];
  private limit?: number;
  private offset?: number;

  public constructor(private typeName: string) {
  }

  static createFromRequest(request: Request): RequestBuilder {
    const rb = new RequestBuilder(request.typeName)
      .addFields(request.includedFields)
      .addCondition(request.condition);
    if (!!request.order) {
      rb.addOrderDefinitions(request.order);
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
    this.condition = condition;
    return this;
  }

  public addOrderDefinitions(orderDefinitions: IOrderDefinition[]): RequestBuilder {
    if (!this.order) {
      this.order = [];
    }
    this.order.push(...orderDefinitions);
    return this;
  }

  public addOrderDefinition(orderDefinition: IOrderDefinition): RequestBuilder {
    if (!this.order) {
      this.order = [];
    }
    this.order.push(orderDefinition);
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
    return new Request(this.typeName, this.offset, this.limit, this.condition, this.includedFields, this.order);
  }
}
