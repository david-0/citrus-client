import {HttpClient} from "@angular/common/http";
import {Inject, Injectable} from "@angular/core";
import {JwtHelperService} from "@auth0/angular-jwt";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {AuthToken} from "./auth-token";
import {EmailPassword} from "./email-password";
import {RegisterResult} from "./register-result.enum";

@Injectable()
export class AuthenticationService {
  private static readonly accessToken = "access_token";
  private jwtHelper: JwtHelperService = new JwtHelperService();
  private id: string;
  private roles: string[];

  constructor(private http: HttpClient,
              @Inject("baseUrl") private baseUrl: string) {
    const token = localStorage.getItem(AuthenticationService.accessToken);
    if (token) {
      this.decodeToken(token);
      console.log("token restored");
    }
  }

  public static getAccessToken(): string {
    return localStorage.getItem(AuthenticationService.accessToken);
  }

  public login(email: string, password: string): Observable<boolean> {
    return this.verifyPassword(new EmailPassword(email, password), (authToken: AuthToken) => {
      this.updateToken(authToken);
      console.log(`login succeeded. UserId: ${this.id}`);
    });
  }

  public verify(email: string, password: string): Observable<boolean> {
    return this.verifyPassword(new EmailPassword(email, password), () => {
    });
  }

  public changeMyPassword(currentPassword: string, password: string): Observable<boolean> {
    return this.http.post<AuthToken>(this.baseUrl + "/user/changemypassword", {
      currentPassword,
      password
    }).pipe(
      map(authToken => {
        // changePassword successful if there's a jwt token in the response
        if (!!authToken && !!authToken.token) {
          this.updateToken(authToken);
        }
        return !!authToken;
      })
    );
  }

  public register(name: string, prename: string, phoneNumber: string, email: string): Observable<RegisterResult> {
    return this.http.post<number>(this.baseUrl + "/user/register", {
      name,
      prename,
      phoneNumber,
      email
    }).pipe(
      map(number => {
        if (number === 0) {
          return RegisterResult.OK;
        }
        if (number === 1) {
          return RegisterResult.USER_ALREADY_EXISTS;
        }
        return RegisterResult.OTHER;
      })
    );
  }

  public resetPasswordWithToken(token: string, password: string): Observable<boolean> {
    return this.http.post<AuthToken>(this.baseUrl + "/user/resetPasswordWithToken", {
      token,
      password
    }).pipe(
      map(authToken => {
        // changePassword successful if there's a jwt token in the response
        if (!!authToken && !!authToken.token) {
          this.updateToken(authToken);
        }
        return !!authToken;
      })
    );
  }

  public confirmUserAndSetPassword(token: string, password: string): Observable<boolean> {
    return this.http.post<boolean>(this.baseUrl + "/user/confirm", {
      token,
      password
    }).pipe(
      map(result => {
        return result;
      })
    );
  }

  public changePassword(userId: number, password: string): Observable<boolean> {
    return this.http.post<AuthToken>(this.baseUrl + `/user/${userId}/changepassword`, {password})
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

  public sendResetEmail(email: string): Observable<void> {
    return this.http.post<void>(this.baseUrl + `/user/createTokenByEmail`, {email}).pipe();
  }

  logout(): void {
    localStorage.removeItem(AuthenticationService.accessToken);
  }

  loggedIn(): boolean {
    const isLoggedIn = !this.jwtHelper.isTokenExpired(AuthenticationService.getAccessToken());
    return isLoggedIn;
  }

  getLoggedInUserId(): string {
    return this.loggedIn() ? this.id : null;
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

  isStore(): boolean {
    if (!this.loggedIn()) {
      return false;
    }
    return this.hasRole("store");
  }

  private updateToken(authToken: AuthToken) {
    // store jwt token in local storage to keep user logged in between page refreshs
    localStorage.setItem(AuthenticationService.accessToken, authToken.token);
    this.decodeToken(authToken.token);
  }

  private verifyPassword(data: EmailPassword, processCallback: (token: AuthToken) => void): Observable<boolean> {
    return this.http.post<AuthToken>(
      this.baseUrl + "/authenticate", data).pipe(
      map(authToken => {
        // login successful if there's a jwt token in the response
        if (!!authToken && !!authToken.token) {
          processCallback(authToken);
        }
        return !!authToken;
      })
    );
  }

  private decodeToken(token: string) {
    const decodedToken = this.jwtHelper.decodeToken(AuthenticationService.getAccessToken());
    this.id = decodedToken.id;
    if (decodedToken.roles) {
      this.roles = decodedToken.roles;
    }
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
