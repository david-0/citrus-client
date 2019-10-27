import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {first} from "rxjs/operators";
import {AuthenticationService} from "../../authentication/authentication.service";
import {RegisterResult} from "../../authentication/register-result.enum";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"]
})
export class RegisterComponent implements OnInit {

  public message: string;
  public phoneNumber: string;
  public name: string;
  public prename: string;
  public email: string;
  public busy: boolean;
  public inputOk: boolean;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private authService: AuthenticationService) {
  }

  ngOnInit() {
  }

  public register(value: any) {
    this.busy = true;
    this.authService.register(value.name, value.prename, value.phoneNumber, value.email)
      .pipe(first())
      .subscribe(result => {
        if (RegisterResult.OK === result ) {
          this.email = value.email;
          this.inputOk = true;
        } else if (RegisterResult.USER_ALREADY_EXISTS === result) {
         this.message = "Ein Benutzer mit der E-Mailadresse '" + value.email + "' existiert bereits.";
        } else {
          this.message = "Ein interner Fehler ist aufgetretten.";
        }
        this.busy = false;
      });
  }

}
