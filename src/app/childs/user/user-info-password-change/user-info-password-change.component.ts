import {Component, OnInit} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: "app-user-info-password-change",
  templateUrl: "./user-info-password-change.component.html",
  styleUrls: ["./user-info-password-change.component.scss"]
})
export class UserInfoPasswordChangeComponent implements OnInit {

  hide = true;
  passwordChangeForm: FormGroup;

  constructor() {
  }

  ngOnInit() {
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
    // this.authService.login(this.email.value, this.password.value).subscribe( successfully => {
    //   if (successfully) {
    //     this.router.navigate(["administration"]);
    //   } else {
    //     console.error("Login failed");
    //   }
    // });
  }

  getErrorMessage(control: FormControl) {
    return control.hasError("required") ? "Eingabe erforderlich" :
      control.hasError("email") ? "Emailadresse ungültig" :
        control.hasError("minlength") ? "Mindestlänge 7 Zeichen" :
          control.hasError("mismatch") ? "Passwörter nicht gleich" :
            "";
  }


}