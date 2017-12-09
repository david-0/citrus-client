import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {IId, IOrderDefinitions} from "citrus-common";
import {Observable} from "rxjs/Observable";
import {RangeResult} from "./range-result";

export class GenericRestService<T extends IId> {
  private headers = new HttpHeaders({"Content-Type": "application/json"});

  constructor(private http: HttpClient, private restUrl: string, private getRangeIncludes: string[] = [], private getIncludes: string[] = []) {
    if (!this.getRangeIncludes) {
      this.getRangeIncludes = [];
    }
    if (!this.getIncludes) {
      this.getIncludes = [];
    }
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

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(this.restUrl);
  }

  getRange(offset: number, limit: number, filter: string, order: IOrderDefinitions): Observable<RangeResult<T>> {
    const url = `${this.restUrl}/${offset}/${limit}`;
    let httpParams = new HttpParams();
    if (order.definitions.length > 0) {
      httpParams = httpParams.set("columnName", order.definitions[0].columnName).set("direction", order.definitions[0].direction);
    }
    if (filter) {
      httpParams = httpParams.set("filter", filter);
    }
    this.getRangeIncludes.forEach((i) => {
      httpParams = httpParams.set("include", i);
    });
    return this.http.get<RangeResult<T>>(url, {headers: this.headers, params: httpParams});
  }

  get(id: number): Observable<T> {
    const url = `${this.restUrl}/${id}`;
    return this.http.get<T>(url, {params: {include: this.getIncludes}});
  }
}
