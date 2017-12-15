import {IId, IOrderDefinitions} from "citrus-common";
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";
import {GenericDatabaseInterface} from "./generic-database.interface";
import {GenericRestService} from "./generic-rest.service";
import {RangeResult} from "./range-result";

export class RestBackendDatabase<T extends IId> implements GenericDatabaseInterface<T> {

  public dataChanged = new Subject<object>();

  public constructor(private rest: GenericRestService<T>,
                     private filterColumns: string[] = [],
                     private includedTypesAtSelect: string[] = [],
                     private includedTypesAtGet: string[] = []) {
  }

  public select(start: number,
                length: number,
                filter: string,
                order: IOrderDefinitions): Observable<RangeResult<T>> {
    return this.rest.getRange(start, length, filter, this.filterColumns, order, this.includedTypesAtSelect);
  }

  public get(id: number): Observable<T> {
    return this.rest.get(id, this.includedTypesAtGet);
  }

  public getAll(): Observable<T[]> {
    return this.rest.getAll(this.includedTypesAtGet);
  }

  public add(t: T): Observable<T> {
    return this.rest.add(t);
  }

  public remove(id: number): Observable<boolean> {
    return this.rest.del(id);
  }

  public update(t: T): Observable<boolean> {
    return this.rest.update(t);
  }
}
