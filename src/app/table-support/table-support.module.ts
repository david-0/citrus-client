import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LineComponent} from './line/line.component';
import {MdButtonModule, MdButtonToggleModule, MdDialogModule, MdIconModule, MdInputModule} from '@angular/material';
import {TableHeaderComponent} from './table-header/table-header.component';
import {OkCancelDialogComponent} from './ok-cancel-dialog/ok-cancel-dialog.component';
import {TableFilterComponent} from './table-filter/table-filter.component';

@NgModule({
  imports: [
    CommonModule,
    MdDialogModule,
    MdButtonModule,
    MdButtonToggleModule,
    MdInputModule,
    MdIconModule,
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
