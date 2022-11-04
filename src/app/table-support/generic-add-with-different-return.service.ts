import {HttpClient, HttpHeaders} from "@angular/common/http";
import {IDtoId} from "citrus-common/lib/dto/dto-id";
import {Observable} from "rxjs";

export class GenericAddWithDifferentReturnService<T, R extends IDtoId> {
  private headers = new HttpHeaders({"Content-Type": "application/json"});

  constructor(private http: HttpClient, private restUrl: string) {
  }

  add(item: T): Observable<R> {
    return this.http.post<R>(this.restUrl, item, {headers: this.headers});
  }
}
