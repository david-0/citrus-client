import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: "app-password-change",
  templateUrl: "./password-change.component.html",
  styleUrls: ["./password-change.component.scss"]
})
export class PasswordChangeComponent implements OnInit {

  hide = true;
  passwordChangeForm: FormGroup;
  @Input() showCurrentPassword = false;
  @Output() onChange = new EventEmitter<string>();
  @Output() onChangeWithCurrent = new EventEmitter<{ currentPassword: string, newPassword: string }>();

  constructor() {
  }

  ngOnInit() {
    this.passwordChangeForm = new FormGroup({
      currentPassword: new FormControl("currentPassword",
        [Validators.required]),
      newPassword: new FormControl("newPassword",
        [Validators.required, Validators.minLength(7)]),
      confirmPassword: new FormControl("confirmPassword",
        [Validators.required, Validators.minLength(7)])
    }, this.passwordMatchValidator);
  }

  private passwordMatchValidator = function (fg: FormGroup) {
    return fg.get("newPassword").value === fg.get("confirmPassword").value ? null : {"mismatch": true};
  };

  get currentPassword() {
    return this.passwordChangeForm.get("currentPassword");
  }

  get confirmPassword() {
    return this.passwordChangeForm.get("confirmPassword");
  }

  get newPassword() {
    return this.passwordChangeForm.get("newPassword");
  }

  submit() {
    if (this.showCurrentPassword) {
      this.onChangeWithCurrent.emit({currentPassword: this.currentPassword.value, newPassword: this.newPassword.value});
    } else {
      this.onChange.emit(this.newPassword.value);
    }
  }

  getErrorMessage(control: FormControl) {
    return control.hasError("required") ? "Eingabe erforderlich" :
      control.hasError("email") ? "E-Mailadresse ungültig" :
        control.hasError("minlength") ? "Mindestlänge 7 Zeichen" :
          control.hasError("mismatch") ? "Passwörter nicht gleich" :
            "";
  }
}
