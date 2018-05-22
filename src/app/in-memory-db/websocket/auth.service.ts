import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import "rxjs/add/observable/of";
import "rxjs/add/operator/do";
import "rxjs/add/operator/finally";
import {Observable} from "rxjs/Observable";

@Injectable()
export class AuthService {

  private refreshTokenCall;

  constructor(private httpClient: HttpClient) {
  }

  saveTokenInLocalStorage(token: string) {
    localStorage.setItem("access_token", token);
  }

  getToken(): Observable<string> {
    if (localStorage.getItem("access_token")) {
      return Observable.of(localStorage.getItem("access_token"));
    }
    return this.refreshToken();
  }

  refreshToken(): Observable<string> {
    /*    if (!this.refreshTokenCall) {
          const base64encodedData = new Buffer("user" + ":" + "password").toString("base64");
          this.refreshTokenCall = this.httpClient.post<string>("http://localhost:3001/login",
            {user: "u", password: "p"},
            {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": "Basic " + base64encodedData
              }
            })
            .do(this.saveTokenInLocalStorage)
            .finally(() => this.refreshTokenCall = null);
        }
        return this.refreshTokenCall;*/
    return null;
  }
}
