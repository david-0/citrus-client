import {IRequestCondition} from "citrus-common";

export class RequestContainsCondition<C> implements IRequestCondition<C> {
  constructor(private _names: string[], private _value: C) {
  }

  public match(item: C): boolean {
    return this._names.map(name => {
      const desc = Object.getOwnPropertyDescriptor(item, name);
      return !!desc && desc.get().toString().indexOf(this._value) > -1;
    }).reduce((c1, c2) => c1 || c2);
  }

  matchId(id: number): boolean {
    return this._names.filter(n => n === "id").length > 0
      && typeof this._value === "number"
      && this._value === id;
  }

  isRangeCondition(): boolean {
    return true;
  }

  public toString(): string {
    return "[" + this._names.join(",") + "]==" + this._value.toString();
  }

}
