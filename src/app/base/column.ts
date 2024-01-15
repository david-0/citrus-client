import { OrderDto } from 'citrus-common';

export class Column<T> {
  constructor(public readonly label: string, public readonly valueProvider: (p: T) => string) {
  }
}
