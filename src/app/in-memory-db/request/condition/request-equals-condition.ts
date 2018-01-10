import {IRequestCondition} from "citrus-common";

export class RequestEqualsCondition implements IRequestCondition {
  constructor(private _name: string, private _value: any) {
  }

  public match(item: any): boolean {
    const desc = Object.getOwnPropertyDescriptor(item, this._name);
    if (!!desc) {
      return desc.get() === this._value;
    }
    return false;
  }

  matchId(id: number): boolean {
    return this._name === "id"
      && typeof this._value === "number"
      && this._value === id;
  }

  isRangeCondition(): boolean {
    return false;
  }

  public toString(): string {
    return this._name + "==" + this._value.toString();
  }
}
