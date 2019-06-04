import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatDialogModule } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
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
