import {HttpClientModule} from "@angular/common/http";
import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatIconModule,
  MatIconRegistry,
  MatInputModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatSelectModule,
  MatSidenavModule,
  MatSortModule,
  MatTableModule,
  MatToolbarModule,
  MatTooltipModule,
} from "@angular/material";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import "hammerjs";
import {ValidatorsModule} from "ng2-validators";

import {AppComponent} from "./app.component";
import {AddressDeleteComponent} from "./childs/address/address-delete/address-delete.component";
import {AddressDetailsComponent} from "./childs/address/address-details/address-details.component";
import {AddressEditComponent} from "./childs/address/address-edit/address-edit.component";
import {AddressOverviewComponent} from "./childs/address/address-overview/address-overview.component";
import {AddressRestService} from "./childs/address/address-rest.service";
import {AddressSettingsService} from "./childs/address/address-settings.service";
import {AdministrationComponent} from "./childs/administration/administration.component";
import {FruitDatabaseService} from "./childs/fruit/fruit-database.service";
import {FruitDeleteComponent} from "./childs/fruit/fruit-delete/fruit-delete.component";
import {FruitDetailsComponent} from "./childs/fruit/fruit-details/fruit-details.component";
import {FruitEditComponent} from "./childs/fruit/fruit-edit/fruit-edit.component";
import {FruitOverviewComponent} from "./childs/fruit/fruit-overview/fruit-overview.component";
import {FruitSettingsService} from "./childs/fruit/fruit-settings.service";
import {ConvertToFruitVolumePipe} from "./childs/transport/pipes/convert-to-fruit-volume.pipe";
import {SortByFruitNamePipe} from "./childs/transport/pipes/sort-by-fruit-name.pipe";
import {TransportDatabaseService} from "./childs/transport/transport-database.service";
import {TransportDeleteComponent} from "./childs/transport/transport-delete/transport-delete.component";
import {TransportDetailsComponent} from "./childs/transport/transport-details/transport-details.component";
import {TransportEditComponent} from "./childs/transport/transport-edit/transport-edit.component";
import {TransportOverviewComponent} from "./childs/transport/transport-overview/transport-overview.component";
import {TransportSettingsService} from "./childs/transport/transport-settings.service";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {AppRouteModule} from "./router/app-route.module";
import {TableSupportModule} from "./table-support/table-support.module";

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AdministrationComponent,
    TransportOverviewComponent,
    TransportDeleteComponent,
    FruitOverviewComponent,
    TransportDetailsComponent,
    TransportEditComponent,
    ConvertToFruitVolumePipe,
    SortByFruitNamePipe,
    FruitDetailsComponent,
    FruitDeleteComponent,
    FruitEditComponent,
    AddressOverviewComponent,
    AddressEditComponent,
    AddressDetailsComponent,
    AddressDeleteComponent,
  ],
  imports: [
    BrowserModule,
    AppRouteModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatSelectModule,
    MatSidenavModule,
    MatButtonToggleModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatFormFieldModule,
    TableSupportModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    FormsModule,
    ValidatorsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    MatIconRegistry,
    TransportDatabaseService,
    TransportSettingsService,
    FruitDatabaseService,
    FruitSettingsService,
    AddressRestService,
    AddressSettingsService,
    ConvertToFruitVolumePipe,
    SortByFruitNamePipe,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
