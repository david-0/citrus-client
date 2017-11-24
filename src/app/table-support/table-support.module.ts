import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {
  MatButtonModule,
  MatButtonToggleModule,
  MatDialogModule,
  MatIconModule,
  MatInputModule
} from "@angular/material";
import {LineComponent} from "./line/line.component";
import {OkCancelDialogComponent} from "./ok-cancel-dialog/ok-cancel-dialog.component";
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
  ],
  declarations: [
    LineComponent,
    TableHeaderComponent,
    OkCancelDialogComponent,
    TableFilterComponent,
  ],
  exports: [
    LineComponent,
    TableHeaderComponent,
    TableFilterComponent,
  ],
  entryComponents: [OkCancelDialogComponent]
})
export class TableSupportModule {
}
