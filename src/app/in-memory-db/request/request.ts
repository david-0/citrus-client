import {IOrderDefinition, IRequestCondition, IRequestField} from "citrus-common";
import {CModel} from "../model/c/c-model";
import {IRequest} from "./i-request";

export class Request<T> implements IRequest<T> {
  private typeName: string;
  constructor(public type: typeof CModel,
              public includedFields?: IRequestField[],
              public conditions?: IRequestCondition<T>[],
              public order?: IOrderDefinition[],
              public limit?: number,
              public offset?: number) {
    this.typeName = type.name;
  }

  private isRangeRequest(): boolean {
    return this.conditions
      .map(cond => cond.isRangeCondition())
      .reduce((acc, curr) => acc || curr, false); // is one a range Condition?
  }

  public isSubRequest(subRequest: IRequest<T>): boolean {
    // TODO: the hasCondition is only true, if we have no condition, make it better --> isSubCondition??
    return !this.hasCondition() && this.areAllFieldsIncluded(subRequest.includedFields);
  }

  private areAllFieldsIncluded(subFields: IRequestField[]): boolean {
    return subFields
      .filter(subField => this.includedFields
        .filter(myField => myField.isEquals(subField))
        .length > 0)
      .length === subFields.length;
  }

  public hasCondition(): boolean {
    return this.conditions.length > 0;
  }

  public match(item: T): boolean {
    return this.conditions.map(c => c.match(item)).reduce((b1, b2) => b1 || b2);
  }

  public matchId(id: number): boolean {
    return this.conditions.map(c => c.matchId(id)).reduce((b1, b2) => b1 || b2);
  }

  public toString(): string {
    return `${this.type.name}_${this.includedFields.map(f => f.toString()).join("+")}` +
      `_${this.conditions.map(c => c.toString()).join("+")}`;
  }
}
