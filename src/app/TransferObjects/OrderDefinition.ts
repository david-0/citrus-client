import {IOrderDefinition} from "citrus-common";

export class OrderDefinition implements IOrderDefinition {
  constructor(public columnName: string, public direction: "asc" | "desc") {
  }
}
