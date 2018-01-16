import {IRequestCondition} from "citrus-common";

export class RequestAndCondition implements IRequestCondition {
  constructor(private requestConditions: IRequestCondition[]) {
  }

  public match(item: any): boolean {
    return this.requestConditions.map(c => c.match(item)).reduce((b1, b2) => b1 && b2);
  }

  matchId(id: number): boolean {
    return this.requestConditions.map(c => c.matchId(id)).reduce((b1, b2) => b1 && b2);
  }

  isRangeCondition(): boolean {
    return this.requestConditions.map(c => c.isRangeCondition()).reduce((b1, b2) => b1 || b2);
  }

  public toString(): string {
    return "{AND: {" + this.requestConditions.map(c => c.toString()).join(",") + "}}";
  }
}
