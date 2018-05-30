/* tslint:disable:component-selector */
import {Component, Input} from "@angular/core";
import {NgForm} from "@angular/forms";

@Component({
  selector: "app-table-header",
  template: "",
})
export class MockTableHeaderComponent {
  @Input() titleText: string;
  @Input() backLink: string;
  @Input() showBack: boolean;
  @Input() showCreate: boolean;
  @Input() showEdit: boolean;
  @Input() showDelete: boolean;
  @Input() showCancelAndSave: boolean;
  @Input() showPasswordChange: boolean;
  @Input() label: string;
  @Input() form: NgForm;
}



