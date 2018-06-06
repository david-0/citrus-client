import {Component, OnInit} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
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

  constructor(private router: Router, private route: ActivatedRoute, private authService: AuthenticationService) {
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl("email", [Validators.required, Validators.email]),
      password: new FormControl("password", [Validators.required,
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
    this.authService.login(this.email.value, this.password.value).subscribe( successfully => {
      if (successfully) {
        this.router.navigate([this.returnUrl]);
      } else {
        console.error("Login failed");
      }
    });
  }

  getErrorMessage(control: FormControl) {
    return control.hasError("required") ? "Eingabe erforderlich" :
      control.hasError("email") ? "Emailadresse ungültig" :
        control.hasError("minlength") ? "Mindestlänge 7 Zeichen" :
          "";
  }
}
