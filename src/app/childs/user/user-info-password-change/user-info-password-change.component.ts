import {Component, OnInit} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../../../authentication/authentication.service";

@Component({
  selector: "app-user-info-password-change",
  templateUrl: "./user-info-password-change.component.html",
  styleUrls: ["./user-info-password-change.component.scss"]
})
export class UserInfoPasswordChangeComponent implements OnInit {

  hide = true;
  passwordChangeForm: FormGroup;
  userInfoId: number;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private authService: AuthenticationService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params["id"] == null) {
        console.error(`Internal server error, no id param`);
      } else {
        this.userInfoId = +params["id"];
      }
    });
    this.passwordChangeForm = new FormGroup({
      password: new FormControl("password",
        [Validators.required, Validators.minLength(7)]),
      confirmPassword: new FormControl("confirmPassword",
        [Validators.required, Validators.minLength(7)])
    }, this.passwordMatchValidator);
  }

  private passwordMatchValidator = function (fg: FormGroup) {
    return fg.get("password").value === fg.get("confirmPassword").value ? null : {"mismatch": true};
  };

  get confirmPassword() {
    return this.passwordChangeForm.get("confirmPassword");
  }

  get password() {
    return this.passwordChangeForm.get("password");
  }

  submit() {
    this.authService.changePassword(this.userInfoId, this.password.value).subscribe(successfully => {
      if (successfully) {
        this.router.navigate(["administration"]);
      } else {
        console.error("Login failed");
      }
    });
  }

  getErrorMessage(control: FormControl) {
    return control.hasError("required") ? "Eingabe erforderlich" :
      control.hasError("email") ? "Emailadresse ungültig" :
        control.hasError("minlength") ? "Mindestlänge 7 Zeichen" :
          control.hasError("mismatch") ? "Passwörter nicht gleich" :
            "";
  }


}
