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
import {AddressRestDatabaseService} from "./childs/address/address-rest-database.service";
import {AddressSettingsService} from "./childs/address/address-settings.service";
import {AdministrationComponent} from "./childs/administration/administration.component";
import {UserInfoDeleteComponent} from "./childs/user/user-info-delete/user-info-delete.component";
import {UserInfoDetailsComponent} from "./childs/user/user-info-details/user-info-details.component";
import {UserInfoEditComponent} from "./childs/user/user-info-edit/user-info-edit.component";
import {UserInfoOverviewComponent} from "./childs/user/user-info-overview/user-info-overview.component";
import {UserInfoRestDatabaseService} from "./childs/user/user-info-rest-database.service";
import {UserDetailsSettingsService} from "./childs/user/user-info-settings.service";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {AppRouteModule} from "./router/app-route.module";
import {TableSupportModule} from "./table-support/table-support.module";

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AdministrationComponent,
    AddressOverviewComponent,
    AddressEditComponent,
    AddressDetailsComponent,
    AddressDeleteComponent,
    UserInfoDeleteComponent,
    UserInfoDetailsComponent,
    UserInfoEditComponent,
    UserInfoOverviewComponent,
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
    AddressRestDatabaseService,
    AddressSettingsService,
    UserInfoRestDatabaseService,
    UserDetailsSettingsService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
