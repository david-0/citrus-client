import {Component, Inject} from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "app-ok-cancel-dialog",
  templateUrl: "./ok-cancel-dialog.component.html",
  styleUrls: ["./ok-cancel-dialog.component.scss"]
})
export class OkCancelDialogComponent {

  constructor(public dialogRef: MatDialogRef<OkCancelDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
