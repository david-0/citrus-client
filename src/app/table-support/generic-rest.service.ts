import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {IId, IOrderDefinitions} from "citrus-common";
import {IWhereDefinition} from "citrus-common/lib/interfaces/IWhereDefinition";
import {Observable} from "rxjs/Observable";
import {RangeResult} from "./range-result";

export class GenericRestService<T extends IId> {
  private headers = new HttpHeaders({"Content-Type": "application/json"});

  constructor(private http: HttpClient, private restUrl: string) {
  }

  add(item: T): Observable<T> {
    return this.http.post<T>(this.restUrl, JSON.stringify(item), {headers: this.headers});
  }

  update(item: T): Observable<boolean> {
    const url = `${this.restUrl}/${item.id}`;
    return this.http.put<boolean>(url, JSON.stringify(item), {headers: this.headers});
  }

  del(id: number): Observable<boolean> {
    const url = `${this.restUrl}/${id}`;
    return this.http.delete<boolean>(url, {headers: this.headers});
  }

  getAll(includedTypes: string[] = [], where: IWhereDefinition = null): Observable<T[]> {
    let httpParams = new HttpParams();
    if (where && where.columnName && where.id) {
      httpParams = httpParams.set("whereColumn", where.columnName).set("whereId", where.id.toString());
    }
    return this.http.get<T[]>(this.restUrl, {params: httpParams});
  }

  getRange(offset: number, limit: number, filter: string, filterColumns: string[], order: IOrderDefinitions,
           where: IWhereDefinition, includedTypes: string[]): Observable<RangeResult<T>> {
    const url = `${this.restUrl}/${offset}/${limit}`;
    let httpParams = new HttpParams();
    if (order.definitions.length > 0) {
      httpParams = httpParams.set("columnName", order.definitions[0].columnName).set("direction", order.definitions[0].direction);
    }
    if (where && where.columnName && where.id) {
      httpParams = httpParams.set("whereColumn", where.columnName).set("whereId", where.id.toString());
    }
    if (filter) {
      httpParams = httpParams.set("filter", filter);
      filterColumns.forEach((c) => {
        httpParams = httpParams.append("filterColumns", c);
      });
    }
    includedTypes.forEach((i) => {
      httpParams = httpParams.set("includes", i);
    });
    return this.http.get<RangeResult<T>>(url, {headers: this.headers, params: httpParams});
  }

  get(id: number, includedTypes: string[]): Observable<T> {
    const url = `${this.restUrl}/${id}`;
    return this.http.get<T>(url, {params: {includes: includedTypes}});
  }
}
