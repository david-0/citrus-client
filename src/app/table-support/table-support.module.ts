import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {
  MatButtonModule,
  MatButtonToggleModule,
  MatDialogModule,
  MatIconModule,
  MatInputModule,
  MatProgressSpinnerModule
} from "@angular/material";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FileUploadModule} from "@iplab/ngx-file-upload";
import {ImageUploadComponent} from "./image-upload/image-upload.component";
import {LineComponent} from "./line/line.component";
import {OkCancelDialogComponent} from "./ok-cancel-dialog/ok-cancel-dialog.component";
import {ProgessSpinnerComponent} from "./progess-spinner/progess-spinner.component";
import {TableFilterComponent} from "./table-filter/table-filter.component";
import {TableHeaderComponent} from "./table-header/table-header.component";

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatInputModule,
    MatIconModule,
    MatProgressSpinnerModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule,
  ],
  declarations: [
    LineComponent,
    TableHeaderComponent,
    OkCancelDialogComponent,
    TableFilterComponent,
    ProgessSpinnerComponent,
    ImageUploadComponent,
  ],
  exports: [
    LineComponent,
    TableHeaderComponent,
    TableFilterComponent,
    ProgessSpinnerComponent,
    ImageUploadComponent,
  ],
  entryComponents: [OkCancelDialogComponent]
})
export class TableSupportModule {
}
