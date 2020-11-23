import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Inject, Injectable} from "@angular/core";
import {Observable} from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ConfirmationRestService  {
  protected headers = new HttpHeaders({"Content-Type": "application/json"});

  constructor(private http: HttpClient,  @Inject("baseUrl") private baseUrl: string) {
  }

  resend(item: number): Observable<boolean> {
    return this.http.post<boolean>(this.baseUrl + "/confirmation", JSON.stringify({orderId: item}), {headers: this.headers});
  }

}
