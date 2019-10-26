import {Component, isDevMode, OnInit} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {first} from "rxjs/operators";
import {AuthenticationService} from "../authentication/authentication.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {

  hide = true;
  loginForm: FormGroup;
  returnUrl: string;
  public busy: boolean;
  public message: string;

  constructor(private router: Router, private route: ActivatedRoute, private authService: AuthenticationService) {
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required,
        Validators.minLength(7)])
    });
    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";
  }

  get email() {
    return this.loginForm.get("email");
  }

  get password() {
    return this.loginForm.get("password");
  }

  submit() {
    this.busy = true;
    this.authService.login(this.email.value, this.password.value)
      .pipe(first())
      .subscribe(result => {
        this.busy = false;
        if (result === true) {
          this.router.navigate([this.returnUrl]);
        } else {
          this.message = "email or password is incorrect";
        }
      }, (error: Response) => {
        this.busy = false;
        if (error.status === 404) {
          this.message = `Anmeldeserver nicht erreichbar! (${error.url})`;
        } else {
          if (isDevMode()) {
            this.message = "Anmeldung nicht erfolgreich (Benuter/Password falsch)! " + JSON.stringify(error);
          } else {
            this.message = "Anmeldung nicht erfolgreich (Benuter/Password falsch)!";
          }
        }
      });
  }

  getErrorMessage(control: FormControl) {
    return control.hasError("required") ? "Eingabe erforderlich" :
      control.hasError("email") ? "E-Mailadresse ungültig" :
        control.hasError("minlength") ? "Mindestlänge 7 Zeichen" :
          "";
  }
}
