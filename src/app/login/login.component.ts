import {Component, OnInit} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {

  hide = true;
  loginForm: FormGroup;

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl("email", [Validators.required, Validators.email]),
      password: new FormControl("password", [Validators.required,
        Validators.minLength(7)])
    });
  }

  get email() {
    return this.loginForm.get("email");
  }

  get password() {
    return this.loginForm.get("password");
  }

  submit() {
    // console.info(`email: ${this.email.value} password: ${this.password.value}`);
    // check auth-service
    this.router.navigate(["administration"]);
  }

  getErrorMessage(control: FormControl) {
    return control.hasError("required") ? "Eingabe erforderlich" :
      control.hasError("email") ? "Emailadresse ungültig" :
        control.hasError("minlength") ? "Mind. 7 zeichen" :
          "";
  }
}
