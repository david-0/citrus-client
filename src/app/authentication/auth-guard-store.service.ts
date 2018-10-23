import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, RouterStateSnapshot} from "@angular/router";
import {AuthenticationService} from "./authentication.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuardStore implements CanActivate, CanActivateChild {

  constructor(private authenticationService: AuthenticationService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.checkAdmin();
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }

  checkAdmin(): boolean {
    if (this.authenticationService.isStore()) {
      return true;
    }
    return false;
  }
}
