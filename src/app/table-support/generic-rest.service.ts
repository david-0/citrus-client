import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {IId} from "../entities/IId";
import {handleError} from "./error-utils";
import {RangeResult} from "./range-result";

export class GenericRestService<T extends IId> {
  private headers = new HttpHeaders({"Content-Type": "application/json"});

  private i = 2;

  constructor(private http: HttpClient, private restUrl: string) {
    this.i = 3;
  }

  add(item: T): Observable<T> {
    return this.http
      .post<T>(this.restUrl, JSON.stringify(item), {headers: this.headers})
      .catch(handleError);
  }

  update(item: T): Observable<boolean> {
    const url = `${this.restUrl}/${item.id}`;
    return this.http
      .put<boolean>(url, JSON.stringify(item), {headers: this.headers})
      .catch(handleError);
  }

  del(id: number): Observable<boolean> {
    const url = `${this.restUrl}/${id}`;
    return this.http
      .delete<boolean>(url, {headers: this.headers})
      .catch(handleError);
  }

  getAll(): Observable<T[]> {
    return this.http
      .get<T[]>(this.restUrl)
      .catch(handleError);
  }

  getRange(offset: number, limit: number, filter: string,
           order: { columnName: string, direction: string }[]): Observable<RangeResult<T>> {
    const url = `${this.restUrl}/${offset}/${limit}`;
    let httpParams = new HttpParams();
    if (order.length > 0) {
      httpParams = httpParams.set("columnName", order[0].columnName).set("direction", order[0].direction);
    }
    if (filter) {
      httpParams = httpParams.set("filter", filter);
    }
    return this.http.get<RangeResult<T>>(url, {headers: this.headers, params: httpParams});
  }

  get(id: number): Observable<T> {
    const url = `${this.restUrl}/${id}`;
    return this.http
      .get<T>(url)
      .catch(handleError);
  }
}
