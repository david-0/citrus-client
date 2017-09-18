import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';

export class GenericDatabase<T> {

  public dataChange = new BehaviorSubject<T[]>([]);
  private inputDataChange = new BehaviorSubject<T[]>([]);
  private filterChange = new BehaviorSubject('');

  public constructor(private prefetched: boolean,
                     private filterCallback: (item: T, filterValue: string) => boolean) {
  }

  public get data(): T[] {
    return this.dataChange.value;
  }

  public get inputData(): T[] {
    return this.inputDataChange.value;
  }

  public set inputData(items: T[]) {
    this.inputDataChange.next(items);
    this.dataChange.next(this.filterItems(items));
  }

  private filterItems(items: T[]): T[] {
    return items.filter(item => this.filterCallback(item, this.filterChange.value));
  }

  public get filter(): string {
    return this.filterChange.value;
  }

  public set filter(filter: string) {
    this.filterChange.next(filter);
    this.dataChange.next(this.filterItems(this.inputDataChange.value));
  }

  public select(start: number,
                length: number,
                compare: (a: T, b: T) => number = this.noCompare): T[] {
    this.data.sort(compare);
    return this.data.slice().splice(start, length);
  }

  public get(id: number): Observable<T> {
    return null;
  }

  public add(t: T): Observable<boolean> {
    return null;
  }

  public remove(id: number): Observable<boolean> {
    return null;
  }

  public update(t: T): Observable<boolean> {
    return null;
  }

  public noCompare(a: T, b: T): number {
    return 0;
  }

  private noFilter(t: T, filterValue: string): boolean {
    return true;
  }
}
