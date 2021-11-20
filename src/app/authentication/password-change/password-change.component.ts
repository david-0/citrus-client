import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup, NgForm, Validators } from "@angular/forms";

@Component({
  selector: "app-password-change",
  templateUrl: "./password-change.component.html",
  styleUrls: ["./password-change.component.scss"]
})
export class PasswordChangeComponent implements OnInit {

  hide = true;
  ngF: NgForm;
  passwordChangeForm: FormGroup;
  @Input() showCurrentPassword = false;
  @Output() onChange = new EventEmitter<string>();
  @Output() onChangeWithCurrent = new EventEmitter<{ currentPassword: string, newPassword: string }>();

  constructor() {
  }

  ngOnInit() {
    if (this.showCurrentPassword) {
      this.passwordChangeForm = new FormGroup({
        currentPassword: new FormControl("",
          [Validators.required]),
        newPassword: new FormControl("",
          [Validators.required, Validators.minLength(7)]),
        confirmPassword: new FormControl("",
          [Validators.required, Validators.minLength(7)])
      }, this.passwordMatchValidator);
    } else {
      this.passwordChangeForm = new FormGroup({
        currentPassword: new FormControl(""),
        newPassword: new FormControl("",
          [Validators.required, Validators.minLength(7)]),
        confirmPassword: new FormControl("",
          [Validators.required, Validators.minLength(7)])
      }, this.passwordMatchValidator);
    }
    this.ngF = new NgForm(null, null);
    this.ngF.form = this.passwordChangeForm;
  }

  private passwordMatchValidator = function (fg: FormGroup) {
    return fg.get("newPassword").value === fg.get("confirmPassword").value ? null : { "mismatch": true };
  };

  get currentPassword(): FormControl {
    return <FormControl>this.passwordChangeForm.get("currentPassword");
  }

  get confirmPassword(): FormControl {
    return <FormControl>this.passwordChangeForm.get("confirmPassword");
  }

  get newPassword(): FormControl {
    return <FormControl>this.passwordChangeForm.get("newPassword");
  }

  submit() {
    if (this.showCurrentPassword) {
      this.onChangeWithCurrent.emit({ currentPassword: this.currentPassword.value, newPassword: this.newPassword.value });
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

  getFormErrorMessage(control: FormGroup) {
    return control.hasError("required") ? "Eingabe erforderlich" :
      control.hasError("email") ? "E-Mailadresse ungültig" :
        control.hasError("minlength") ? "Mindestlänge 7 Zeichen" :
          control.hasError("mismatch") ? "Passwörter nicht gleich" :
            "";
  }
}
