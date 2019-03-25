import {Component} from "@angular/core";
import {Router} from "@angular/router";
import {AuthenticationService} from "./authentication/authentication.service";
import {CartStateService} from "./cart/cart-state.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  constructor(public router: Router,
              public authService: AuthenticationService,
              public cartStateService: CartStateService) {
  }

  logout() {
    this.authService.logout();
    this.router.navigate(["logout"]);
  }
}
