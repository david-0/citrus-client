import {Component, OnInit} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthenticationService} from "../authentication/authentication.service";

@Component({
  selector: "app-logout",
  templateUrl: "./logout.component.html",
  styleUrls: ["./logout.component.scss"]
})
export class LogoutComponent implements OnInit {

  hide = true;
  loginForm: FormGroup;

  constructor(private router: Router, private authService: AuthenticationService) {
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
    this.authService.login(this.email.value, this.password.value).subscribe(successfully => {
      if (successfully) {
        this.router.navigate(["administration"]);
      } else {
        console.error("Login failed");
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
