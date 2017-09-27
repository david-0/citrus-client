import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LineComponent} from './line/line.component';
import {MaterialModule} from '@angular/material';
import {ListHeaderComponent} from './list-header/list-header.component';
import {OkCancelDialogComponent} from './ok-cancel-dialog/ok-cancel-dialog.component';
import {
  MdButtonModule,
  MdButtonToggleModule,
  MdCardModule,
  MdDatepickerModule,
  MdDialogModule,
  MdFormFieldModule,
  MdIconModule,
  MdIconRegistry,
  MdInputModule,
  MdNativeDateModule,
  MdPaginatorModule,
  MdSelectModule,
  MdSidenavModule,
  MdSortModule,
  MdTableModule,
  MdToolbarModule,
  MdTooltipModule,
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MdDialogModule,
    MdButtonModule,
    MdButtonToggleModule,
    MdIconModule,
  ],
  declarations: [
    LineComponent,
    ListHeaderComponent,
    OkCancelDialogComponent,
  ],
  exports: [
    LineComponent,
    ListHeaderComponent,
  ],
  entryComponents: [OkCancelDialogComponent]
})
export class ListSupportModule {
}
