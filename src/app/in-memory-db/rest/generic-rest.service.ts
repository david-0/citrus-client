import {HttpClient} from "@angular/common/http";
import {IOrderDefinitions, IRequestCondition} from "citrus-common";
import {Observable} from "rxjs/Observable";
import {TModel} from "../model/t/t-model";
import {RangeResult} from "./range-result";

export class GenericRestService<T extends TModel> {

  constructor(private http: HttpClient, private restUrl: string) {
  }

  add(item: T): Observable<T> {
    return this.http.post<T>(this.restUrl, JSON.stringify(item));
  }

  update(item: T): Observable<boolean> {
    const url = `${this.restUrl}/${item.id}`;
    return this.http.put<boolean>(url, JSON.stringify(item));
  }

  del(id: number): Observable<boolean> {
    const url = `${this.restUrl}/${id}`;
    return this.http.delete<boolean>(url);
  }

  getAll(includedFields: string[] = [], condition: IRequestCondition = null): Observable<T[]> {
    return this.http.post<T[]>(this.restUrl, {includedFields: includedFields, condition: condition});
  }

  getRange(offset: number, limit: number, includedFields: string[] = [], condition: IRequestCondition,
           order: IOrderDefinitions): Observable<RangeResult<T>> {
    const url = `${this.restUrl}/${offset}/${limit}`;
    return this.http.post<RangeResult<T>>(url, {includedFields: includedFields, condition: condition, order: order});
  }

  get(id: number, includedFields: string[] = []): Observable<T> {
    const url = `${this.restUrl}/${id}`;
    return this.http.post<T>(url, {includedFields: includedFields});
  }
}
