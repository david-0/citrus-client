import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {IId} from '../entities/IId';

export class GenericDatabase<T extends IId> {

  public dataChange = new BehaviorSubject<T[]>([]);

  private static noCompare<T>(a: T, b: T, order: [{ column: string, direction: string }]): number {
    return 0;
  }

  private static noFilter<T>(t: T, filterValue: string): boolean {
    return true;
  }

  public constructor(private prefetched: boolean,
                     private filterCallback: (item: T, filterValue: string) => boolean
                       = GenericDatabase.noFilter,
                     private compareCallback: (a: T, b: T, order: { column: string, direction: string }[]) => number
                       = GenericDatabase.noCompare) {
  }

  public get data(): T[] {
    return this.dataChange.value;
  }

  public set data(items: T[]) {
    this.dataChange.next(items);
  }

  private filterItems(items: T[], filter: string): T[] {
    return items.filter(item => this.filterCallback(item, filter));
  }

  private orderItems(items: T[], order: { column: string, direction: string }[]): T[] {
    return items.sort((a: T, b: T) => this.compareCallback(a, b, order));
  }

  public numberOfItems(filter: string = '') {
    const itemsCopy = this.data.slice();
    return this.filterItems(itemsCopy, filter).length;
  }

  public select(start: number,
                length: number,
                filter: string = '',
                order: { column: string, direction: string }[] = []): T[] {
    const itemsCopy = this.data.slice();
    const filteredItems = this.filterItems(itemsCopy, filter);
    const orderedItems = this.orderItems(filteredItems, order);
    return orderedItems.splice(start, length);
  }

  public get(id: number): Observable<T> {
    const replaySubject = new ReplaySubject<T>(1);
    const t: T[] = this.data.filter(obj => obj.id === id);
    if (t.length < 1) {
      console.error('no object with id {{id}}');
    } else {
      replaySubject.next(t[0]);
    }
    return replaySubject;
  }

  public add(t: T): Observable<boolean> {
    return null;
  }

  public remove(id: number): Observable<boolean> {
    return null;
  }

  public update(t: T): Observable<boolean> {
    const newData: T[] = [];
    let updated = false;
    this.data.forEach(item => {
      newData.push((item.id === t.id) ? t : item);
      updated = updated || (item.id === t.id) ? true : false;
    });
    this.data = newData;
    return Observable.create(() => true);
  }
}
