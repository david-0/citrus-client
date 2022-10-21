import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { UntypedFormControl, UntypedFormGroup, NgForm, Validators } from "@angular/forms";

@Component({
  selector: "app-password-change",
  templateUrl: "./password-change.component.html",
  styleUrls: ["./password-change.component.scss"]
})
export class PasswordChangeComponent implements OnInit {

  hide = true;
  ngF: NgForm;
  passwordChangeForm: UntypedFormGroup;
  @Input() showCurrentPassword = false;
  @Output() onChange = new EventEmitter<string>();
  @Output() onChangeWithCurrent = new EventEmitter<{ currentPassword: string, newPassword: string }>();

  constructor() {
  }

  ngOnInit() {
    if (this.showCurrentPassword) {
      this.passwordChangeForm = new UntypedFormGroup({
        currentPassword: new UntypedFormControl("",
          [Validators.required]),
        newPassword: new UntypedFormControl("",
          [Validators.required, Validators.minLength(7)]),
        confirmPassword: new UntypedFormControl("",
          [Validators.required, Validators.minLength(7)])
      }, this.passwordMatchValidator);
    } else {
      this.passwordChangeForm = new UntypedFormGroup({
        currentPassword: new UntypedFormControl(""),
        newPassword: new UntypedFormControl("",
          [Validators.required, Validators.minLength(7)]),
        confirmPassword: new UntypedFormControl("",
          [Validators.required, Validators.minLength(7)])
      }, this.passwordMatchValidator);
    }
    this.ngF = new NgForm(null, null);
    this.ngF.form = this.passwordChangeForm;
  }

  private passwordMatchValidator = function (fg: UntypedFormGroup) {
    return fg.get("newPassword").value === fg.get("confirmPassword").value ? null : { "mismatch": true };
  };

  get currentPassword(): UntypedFormControl {
    return <UntypedFormControl>this.passwordChangeForm.get("currentPassword");
  }

  get confirmPassword(): UntypedFormControl {
    return <UntypedFormControl>this.passwordChangeForm.get("confirmPassword");
  }

  get newPassword(): UntypedFormControl {
    return <UntypedFormControl>this.passwordChangeForm.get("newPassword");
  }

  submit() {
    if (this.showCurrentPassword) {
      this.onChangeWithCurrent.emit({ currentPassword: this.currentPassword.value, newPassword: this.newPassword.value });
    } else {
      this.onChange.emit(this.newPassword.value);
    }
  }

  getErrorMessage(control: UntypedFormControl) {
    return control.hasError("required") ? "Eingabe erforderlich" :
      control.hasError("email") ? "E-Mailadresse ungültig" :
        control.hasError("minlength") ? "Mindestlänge 7 Zeichen" :
          control.hasError("mismatch") ? "Passwörter nicht gleich" :
            "";
  }

  getFormErrorMessage(control: UntypedFormGroup) {
    return control.hasError("required") ? "Eingabe erforderlich" :
      control.hasError("email") ? "E-Mailadresse ungültig" :
        control.hasError("minlength") ? "Mindestlänge 7 Zeichen" :
          control.hasError("mismatch") ? "Passwörter nicht gleich" :
            "";
  }
}
