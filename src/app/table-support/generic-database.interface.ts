import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import {IId} from '../entities/IId';
import {RangeResult} from './range-result';

export interface GenericDatabaseInterface<T extends IId> {

  dataChange: BehaviorSubject<T[]>;

  data: T[];

  select(start: number,
         length: number,
         filter: string,
         order: { columnName: string, direction: string }[]): Observable<RangeResult<T>>;

  get(id: number): Observable<T>;

  add(t: T): Observable<T>;

  remove(id: number): Observable<boolean>;

  update(t: T): Observable<boolean>;
}
