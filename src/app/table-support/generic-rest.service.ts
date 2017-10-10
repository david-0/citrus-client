import {handleError} from './error-utils';
import {Observable} from 'rxjs/Observable';
import {IId} from '../entities/IId';
import {Http} from '@angular/http';

export class GenericRestService<T extends IId> {

  constructor(private http: Http, private restUrl: string) {
  }

  add(item: T): Observable<T> {
    return this.http
      .post(this.restUrl, JSON.stringify(item))
      .map(response => response.json() as T)
      .catch(handleError);
  }

  update(item: T): Observable<T> {
    const url = `${this.restUrl}/${item.id}`;
    return this.http
      .put(url, JSON.stringify(item))
      .map(response => response.json() as T)
      .catch(handleError);
  }

  del(id: number): Observable<void> {
    const url = `${this.restUrl}/${id}`;
    return this.http
      .delete(url)
      .map(response => response.json() as String)
      .catch(handleError);
  }

  getAll(): Observable<T[]> {
    return this.http.get(this.restUrl)
      .map(response =>
        response.json() as T[]
      )
      .catch(handleError);
  }

  getRange(offset: number, limit: number, filter: string,
           order: [{ columnName: string, direction: string }]): Observable<{ count: number, items: T[] }> {
    const url = `${this.restUrl}/${offset}/${limit}/${filter}/${order[0].columnName}/${order[0].direction}`;
    return this.http.get(url)
      .map(response =>
        response.json() as { length: number, items: T[] }
      )
      .catch(handleError);
  }

  get(id: number): Observable<T> {
    const url = `${this.restUrl}/${id}`;
    return this.http.get(url)
      .map(response => response.json() as T)
      .catch(handleError);
  }
}
