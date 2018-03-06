import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {JwtHelper, tokenNotExpired} from "angular2-jwt";
import {Observable} from "rxjs/Observable";
import {AuthToken} from "./auth-token";
import {EmailPassword} from "./email-password";

@Injectable()
export class AuthenticationService {
  private static readonly accessToken = "access_token";
  private jwtHelper: JwtHelper = new JwtHelper();
  private email: string;
  private roles: string[];

  constructor(private http: HttpClient) {
    const token = localStorage.getItem(AuthenticationService.accessToken);
    if (token) {
      this.decodeToken(token);
      console.log("token restored");
    }
  }

  public login(email: string, password: string): Observable<boolean> {
    return this.verifyPassword(new EmailPassword(email, password), (authToken: AuthToken) => {
      // store jwt token in local storage to keep user logged in between page refreshs
      localStorage.setItem(AuthenticationService.accessToken, authToken.token);
      this.decodeToken(authToken.token);
      console.log(`login succeeded. email: ${this.email}`);
    });
  }

  public verify(email: string, password: string): Observable<boolean> {
    return this.verifyPassword(new EmailPassword(email, password), () => {
    });
  }

  private verifyPassword(data: EmailPassword, processCallback: (token: AuthToken) => void): Observable<boolean> {
    return this.http.post<AuthToken>("http://localhost:3001/api/authenticate", data).map(authToken => {
      // login successful if there's a jwt token in the response
      if (!!authToken && !!authToken.token) {
        processCallback(authToken);
      }
      return !!authToken;
    });
  }

  private decodeToken(token: string) {
    const decodedToken = this.jwtHelper.decodeToken(this.getAccessToken());
    this.email = decodedToken.email;
    this.roles = decodedToken.roles.map(role => role.name);
  }

  logout(): void {
    localStorage.removeItem(AuthenticationService.accessToken);
  }

  loggedIn(): boolean {
    const isLoggedIn = tokenNotExpired(AuthenticationService.accessToken);
    return isLoggedIn;
  }

  public getAccessToken(): string {
    return localStorage.getItem(AuthenticationService.accessToken);
  }

  getLoggedInUsername(): string {
    return this.loggedIn() ? this.email : null;
  }

  isAdmin():  boolean {
    if (!this.loggedIn()) {
      return false;
    }
    let ret = false;
    this.roles.forEach(role => {
      if (role === "admin") {
        ret = true;
      }
    });
    return ret;
  }
}
