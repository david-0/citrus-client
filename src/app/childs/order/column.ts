import { OrderDto } from 'citrus-common';

export class Column {
  constructor(public readonly label: string, public readonly valueProvider: (p: OrderDto) => string) {
  }
}
