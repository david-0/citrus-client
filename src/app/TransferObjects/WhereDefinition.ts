import {IWhereDefinition} from "citrus-common";

export class WhereDefinition implements IWhereDefinition {
  constructor(public columnName: string, public id: number) {
  }
}
