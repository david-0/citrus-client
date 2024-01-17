import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthenticationService } from "../authentication/authentication.service";

@Component({
  selector: "app-change-my-password",
  templateUrl: "./change-my-password.component.html",
  styleUrls: ["./change-my-password.component.scss"]
})
export class ChangeMyPasswordComponent {

  constructor(private router: Router,
    private authService: AuthenticationService) {
  }

  changeMyPassword(event: any) {
    this.authService.changeMyPassword(event.currentPassword, event.newPassword).subscribe(successfully => {
      if (successfully) {
        this.router.navigate([`/dashboard`]);
      } else {
        console.error("Password change failed");
      }
    });
  }

}
