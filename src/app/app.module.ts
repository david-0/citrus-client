import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {
  MdButtonModule,
  MdButtonToggleModule,
  MdCardModule,
  MdDatepickerModule,
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
import 'hammerjs';

import {AppComponent} from './app.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AppRouteModule} from './router/app-route.module';
import {AdministrationComponent} from './childs/administration/administration.component';
import {BuyComponent} from './childs/buy/buy.component';
import {FetchComponent} from './childs/fetch/fetch.component';
import {TransportDeleteComponent} from './childs/transport/transport-delete/transport-delete.component';
import {TransportOverviewComponent} from './childs/transport/transport-overview/transport-overview.component';
import {StorageOverviewComponent} from './childs/storage/storage-overview/storage-overview.component';
import {FruitOverviewComponent} from './childs/fruit/fruit-overview/fruit-overview.component';
import {UsersOverviewComponent} from './childs/user/user-overview/users-overview.component';
import {TableSupportModule} from './table-support/table-support.module';
import {TransportDetailsComponent} from './childs/transport/transport-details/transport-details.component';
import {TransportEditComponent} from './childs/transport/transport-edit/transport-edit.component';
import {TransportDatabaseService} from './childs/transport/transport-database.service';
import {FruitDatabaseService} from './childs/fruit/fruit-database.service';
import {ConvertToFruitVolumePipe} from './childs/transport/pipes/convert-to-fruit-volume.pipe';
import {SortByFruitNamePipe} from './childs/transport/pipes/sort-by-fruit-name.pipe';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ValidatorsModule} from 'ng2-validators';
import {TransportSettingsService} from './childs/transport/transport-settings.service';
import {FruitSettingsService} from './childs/fruit/fruit-settings.service';
import { FruitDetailsComponent } from './childs/fruit/fruit-details/fruit-details.component';
import { FruitDeleteComponent } from './childs/fruit/fruit-delete/fruit-delete.component';
import { FruitEditComponent } from './childs/fruit/fruit-edit/fruit-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AdministrationComponent,
    FetchComponent,
    BuyComponent,
    TransportOverviewComponent,
    TransportDeleteComponent,
    StorageOverviewComponent,
    FruitOverviewComponent,
    UsersOverviewComponent,
    TransportDetailsComponent,
    TransportEditComponent,
    ConvertToFruitVolumePipe,
    SortByFruitNamePipe,
    FruitDetailsComponent,
    FruitDeleteComponent,
    FruitEditComponent,
  ],
  imports: [
    BrowserModule,
    AppRouteModule,
    MdToolbarModule,
    BrowserAnimationsModule,
    MdCardModule,
    MdButtonModule,
    MdSelectModule,
    MdSidenavModule,
    MdButtonToggleModule,
    MdIconModule,
    MdDatepickerModule,
    MdNativeDateModule,
    MdInputModule,
    MdFormFieldModule,
    TableSupportModule,
    MdTooltipModule,
    MdPaginatorModule,
    MdTableModule,
    MdSortModule,
    FormsModule,
    ValidatorsModule,
    ReactiveFormsModule,
  ],
  providers: [
    MdIconRegistry,
    TransportDatabaseService,
    TransportSettingsService,
    FruitDatabaseService,
    FruitSettingsService,
    ConvertToFruitVolumePipe,
    SortByFruitNamePipe,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
