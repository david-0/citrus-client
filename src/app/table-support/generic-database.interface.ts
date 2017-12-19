import {IId, IOrderDefinitions} from "citrus-common";
import {IWhereDefinition} from "citrus-common/lib/interfaces/IWhereDefinition";
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";
import {RangeResult} from "./range-result";

export interface GenericDatabaseInterface<T extends IId> {

  dataChanged: Subject<object>;

  select(start: number,
         length: number,
         filter: string,
         order: IOrderDefinitions,
         where: IWhereDefinition): Observable<RangeResult<T>>;

  get(id: number): Observable<T>;

  getAll(): Observable<T[]>;

  add(t: T): Observable<T>;

  remove(id: number): Observable<boolean>;

  update(t: T): Observable<boolean>;
}
