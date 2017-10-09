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
    return Observable.create(observer => {
      const t: T[] = this.data.filter(obj => obj.id === id);
      if (t.length < 1) {
        observer.error(`no object with id ${id}`);
      } else {
        observer.next(t[0]);
      }
    });
  }

  public add(t: T): Observable<boolean> {
    return Observable.create(observer => {
      const dataCopy = this.data.slice().sort((a, b) => (a.id === b.id) ? 0 : (a.id > b.id) ? 1 : -1);
      t.id = dataCopy[dataCopy.length - 1].id + 1;
      dataCopy.push(t);
      this.data = dataCopy;
      if (true) {
        observer.next(true);
//      } else {
//        observer.error('could not save');
      }
    });
  }

  public remove(id: number): Observable<boolean> {
    return Observable.create(observer => {
      const newData: T[] = [];
      let deleted = false;
      this.data.forEach(item => {
        if (item.id !== id) {
          newData.push(item);
        } else {
          deleted = true;
        }
      });
      this.data = newData;
      if (deleted) {
        observer.next(true);
      } else {
        observer.error(`could not delete transport with id ${id}`);
      }
    });
  }

  public update(t: T): Observable<boolean> {
    return Observable.create(observer => {
      const newData: T[] = [];
      let updated = false;
      this.data.forEach(item => {
        if (item.id !== t.id) {
          newData.push(item);
        } else {
          newData.push(t);
          updated = true;
        }
      });
      this.data = newData;
      if (updated) {
        observer.next(true);
      } else {
        observer.error(`could not update transport with id ${t.id}`);
      }
    });
  }
}
