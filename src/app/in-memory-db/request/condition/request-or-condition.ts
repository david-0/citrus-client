import {IRequestCondition} from "citrus-common";

export class RequestOrCondition implements IRequestCondition {
  constructor(private requestConditions: IRequestCondition[]) {
  }

  public match(item: any): boolean {
    return this.requestConditions.map(c => c.match(item)).reduce((c1, c2) => c1 || c2);
  }

  matchId(id: number): boolean {
    return this.requestConditions.map(c => c.matchId(id)).reduce((c1, c2) => c1 || c2);
  }

  isRangeCondition(): boolean {
    return this.requestConditions
      .map(cond => cond.isRangeCondition())
      .reduce((acc, curr) => acc || curr, false); // is one a range Condition?
  }

  public toString(): string {
    return "{OR: {" + this.requestConditions.map(c => c.toString()).join(",") + "}}";
  }
}