import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../../authentication/authentication.service";

@Component({
  selector: "app-reset-password-with-token",
  templateUrl: "./reset-passwort-with-token.component.html",
  styleUrls: ["./reset-passwort-with-token.component.scss"],
})
export class ResetPasswortWithTokenComponent implements OnInit {
  public message: string;
  public password: string;
  public confirmPassword: string;
  public busy = false;
  public token: string;

  constructor(private authenticationService: AuthenticationService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe((params: any) => {
      if (params && params.token) {
        this.token = params.token;
      }
    });
  }

  public changePassword(passwordForm: any): void {
    this.updatePassword(passwordForm.password);
  }

  private updatePassword(password: string) {
    this.busy = true;
    this.authenticationService.resetPasswordWithToken(this.token, password).subscribe(done => {
      this.busy = false;
      this.message = "Passwort konnte erfolgreich geändert werden!";
    }, error => {
      this.busy = false;
      this.message = "Fehler: Passwort konnte nicht geändert werden. Das Token existiert nicht oder ist abgelaufen!";
    });
  }
}
