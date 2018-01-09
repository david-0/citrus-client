import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {CModel} from "../model/c/c-model";
import {TModel} from "../model/t/t-id";
import {Request} from "../request/request";
import {RangeResult} from "../rest/range-result";

@Injectable()
export class RequestService {
  private restUrl: string;

  constructor(private http: HttpClient) {
    this.restUrl = "http://localhost:3001/api/request";
  }

  public get<T extends TModel, C extends CModel>(request: Request<C>): Observable<RangeResult<T>> {
    return this.http.post<RangeResult<T>>(this.restUrl, request);
  }
}
