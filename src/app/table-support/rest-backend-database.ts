import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import {IId} from '../entities/IId';
import {GenericRestService} from './generic-rest.service';
import {GenericDatabaseInterface} from './generic-database.interface';

export class RestBackendDatabase<T extends IId> implements GenericDatabaseInterface<T> {

  public dataChange = new BehaviorSubject<T[]>([]);

  public constructor(private rest: GenericRestService<T>) {
  }

  public get data(): T[] {
    return this.dataChange.value;
  }

  public set data(items: T[]) {
    this.dataChange.next(items);
  }

  public select(start: number,
                length: number,
                filter: string,
                order: { columnName: string, direction: string }[]): Observable<{ count: number, items: T[] }> {
    return this.rest.getRange(start, length, filter, order);
  }

  public get(id: number): Observable<T> {
    return this.rest.get(id);
  }

  public add(t: T): Observable<T> {
    return this.rest.add(t);
  }

  public remove(id: number): Observable<void> {
    return this.rest.del(id);
  }

  public update(t: T): Observable<T> {
    return this.rest.update(t);
  }
}
