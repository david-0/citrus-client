import {HttpClient, HttpHeaders} from "@angular/common/http";
import {DtoId} from "citrus-common/lib/dto/dto-id";
import {Observable} from "rxjs";

export class GenericAddWithDifferentReturnService<T, R extends DtoId> {
  private headers = new HttpHeaders({"Content-Type": "application/json"});

  constructor(private http: HttpClient, private restUrl: string) {
  }

  add(item: T): Observable<R> {
    return this.http.post<R>(this.restUrl, item, {headers: this.headers});
  }
}
