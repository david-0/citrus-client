import {IOrderDefinition, IRequest, IRequestCondition, IRequestField} from "citrus-common";

export class Request implements IRequest {
  constructor(public readonly typeName: string,
              public readonly offset?: number,
              public readonly limit?: number,
              public readonly condition?: IRequestCondition,
              public readonly includedFields: IRequestField[] = [],
              public readonly order: IOrderDefinition[] = []) {
  }

  public isSubRequest(subRequest: IRequest): boolean {
    if (this.typeName !== subRequest.typeName) {
      return false;
    }
    // TODO: the hasCondition is only true, if we have no condition, make it better --> isSubCondition??
    return !this.condition && this.areAllFieldsIncluded(subRequest.includedFields);
  }

  /**
   * Checks, if the current request contains all the subFields from the parameter.
   * @param {IRequestField[]} subFields
   * @returns {boolean}
   */
  public areAllFieldsIncluded(subFields: IRequestField[]): boolean {
    return subFields
      .filter(subField => this.includedFields
        .filter(myField => myField.isEquals(subField))
        .length > 0)
      .length === subFields.length;
  }

  public match(item: any): boolean {
    return !!this.condition && this.condition.match(item);
  }

  public matchId(id: number): boolean {
    return !!this.condition && this.condition.matchId(id);
  }

  public toString(): string {
    return JSON.stringify(this);
  }
}
