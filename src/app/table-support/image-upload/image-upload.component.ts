import {Component, EventEmitter, Output} from "@angular/core";
import {FileUploadControl, FileUploadValidators} from "@iplab/ngx-file-upload";

@Component({
  selector: "app-image-upload",
  templateUrl: "./image-upload.component.html",
  styleUrls: ["./image-upload.component.scss"]
})
export class ImageUploadComponent {
  @Output() onValueChanges = new EventEmitter<File[]>();

  public fileUploadControl = new FileUploadControl(null, FileUploadValidators.fileSize(80000));

  constructor() {
    this.fileUploadControl.valueChanges.subscribe(files => {
      this.onValueChanges.next(files);
    });
  }
}
