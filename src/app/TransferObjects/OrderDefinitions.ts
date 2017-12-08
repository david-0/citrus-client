import {IOrderDefinition, IOrderDefinitions} from "citrus-common";

export class OrderDefinitions implements IOrderDefinitions {
  constructor(public definitions: IOrderDefinition[] = []) {
  }
}
