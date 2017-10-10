import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import {IId} from '../entities/IId';

export interface GenericDatabaseInterface<T extends IId> {

  dataChange: BehaviorSubject<T[]>;

  data: T[];

  select(start: number,
         length: number,
         filter: string,
         order: { columnName: string, direction: string }[]): Observable<{ count: number, items: T[] }>;

  get(id: number): Observable<T>;

  add(t: T): Observable<T>;

  remove(id: number): Observable<void>;

  update(t: T): Observable<T>;
}
