import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {JwtHelperService} from "../angular-jwt/jwthelper.service";
import {RestUrlPrefixService} from "../table-support/rest-url-prefix.service";
import {AuthToken} from "./auth-token";
import {EmailPassword} from "./email-password";

@Injectable()
export class AuthenticationService {
  private static readonly accessToken = "access_token";
  private jwtHelper: JwtHelperService = new JwtHelperService();
  private email: string;
  private roles: string[];

  constructor(private http: HttpClient, private restUrlPrefixService: RestUrlPrefixService) {
    const token = localStorage.getItem(AuthenticationService.accessToken);
    if (token) {
      this.decodeToken(token);
      console.log("token restored");
    }
  }

  public login(email: string, password: string): Observable<boolean> {
    return this.verifyPassword(new EmailPassword(email, password), (authToken: AuthToken) => {
      this.updateToken(authToken);
      console.log(`login succeeded. email: ${this.email}`);
    });
  }

  private updateToken(authToken: AuthToken) {
    // store jwt token in local storage to keep user logged in between page refreshs
    localStorage.setItem(AuthenticationService.accessToken, authToken.token);
    this.decodeToken(authToken.token);
  }

  public verify(email: string, password: string): Observable<boolean> {
    return this.verifyPassword(new EmailPassword(email, password), () => {
    });
  }

  private verifyPassword(data: EmailPassword, processCallback: (token: AuthToken) => void): Observable<boolean> {
    return this.http.post<AuthToken>(this.restUrlPrefixService.getApiRestPrefix() + "/authenticate", data).pipe(
      map(authToken => {
        // login successful if there's a jwt token in the response
        if (!!authToken && !!authToken.token) {
          processCallback(authToken);
        }
        return !!authToken;
      })
    );
  }

  public changeMyPassword(password: string): Observable<boolean> {
    return this.http.post<AuthToken>("http://localhost:3001/api/user/changemypassword", {password}).pipe(
      map(authToken => {
        // changePassword successful if there's a jwt token in the response
        if (!!authToken && !!authToken.token) {
          this.updateToken(authToken);
        }
        return !!authToken;
      })
    );
  }

  public changePassword(userId: number, password: string): Observable<boolean> {
    return this.http.post<AuthToken>(`http://localhost:3001/api/user/${userId}/changepassword`, {password})
      .pipe(
        map(authToken => {
          // changePassword successful if there's a jwt token in the response
          if (!!authToken && !!authToken.token) {
            this.updateToken(authToken);
          }
          return !!authToken;
        })
      );
  }

  private decodeToken(token: string) {
    const decodedToken = this.jwtHelper.decodeToken(this.getAccessToken());
    this.email = decodedToken.email;
    if (decodedToken.roles) {
      this.roles = decodedToken.roles;
    }
  }

  logout(): void {
    localStorage.removeItem(AuthenticationService.accessToken);
  }

  loggedIn(): boolean {
    const isLoggedIn = !this.jwtHelper.isTokenExpired(this.getAccessToken());
    return isLoggedIn;
  }

  public getAccessToken(): string {
    return localStorage.getItem(AuthenticationService.accessToken);
  }

  getLoggedInUsername(): string {
    return this.loggedIn() ? this.email : null;
  }

  isAdmin(): boolean {
    if (!this.loggedIn()) {
      return false;
    }
    return this.hasRole("admin");
  }

  isSale(): boolean {
    if (!this.loggedIn()) {
      return false;
    }
    return this.hasRole("sale");
  }

  private hasRole(roleName: string) {
    let ret = false;
    this.roles.forEach(role => {
      if (role === roleName) {
        ret = true;
      }
    });
    return ret;
  }
}
