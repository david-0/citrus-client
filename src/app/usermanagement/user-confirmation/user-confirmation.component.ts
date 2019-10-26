import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../../authentication/authentication.service";

@Component({
  selector: "app-user-confirmation",
  templateUrl: "./user-confirmation.component.html",
  styleUrls: ["./user-confirmation.component.scss"]
})
export class UserConfirmationComponent implements OnInit {

  public message: string;
  public busy = false;
  public token: string;

  public password: string;
  public confirmPassword: string;
  public conditionsAccepted: boolean;

  constructor(private authenticationService: AuthenticationService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe((params: any) => {
      if (params && params.token) {
        this.token = params.token;
      }
    });
  }

  private async setPassword(password: string) {
    this.busy = true;
    await this.authenticationService.confirmUserAndSetPassword(this.token, password).subscribe(done => {
      this.busy = false;
      if (done) {
        this.message = "Danke für die Registrierung. Wir werden Sie sobald die Früchte " +
          "für die Bestellungen aufgeschalten sind per E-Mail informieren.";
      } else {
        this.message = this.getMessageError();
      }
    }, error => {
      this.busy = false;
      this.message = this.getMessageError();
    });
  }

  private getMessageError(): string {
    return "Das Benutzerkonto konnte nicht aktiviert werden. " +
      "Die Registrierungs-anfrage existiert nicht oder ist abgelaufen! Versuchen sie es erneut.";
  }
}
