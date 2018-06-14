import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatIconModule,
  MatIconRegistry,
  MatInputModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatRadioModule,
  MatSelectModule,
  MatSidenavModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
} from "@angular/material";
import {MatMomentDateModule} from "@angular/material-moment-adapter";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import "hammerjs";
import {ValidatorsModule} from "ng2-validators";

import {AppComponent} from "./app.component";
import {AuthGuardAdmin} from "./authentication/auth-guard-admin.service";
import {AuthGuard} from "./authentication/auth-guard.service";
import {AuthenticationService} from "./authentication/authentication.service";
import {PasswordChangeComponent} from "./authentication/password-change/password-change.component";
import {TokenInterceptor} from "./authentication/token-interceptor";
import {CartService} from "./cart/cart.service";
import {ShoppingCartComponent} from "./cart/shopping-cart/shopping-cart.component";
import {ChangeMyPasswordComponent} from "./change-my-password/change-my-password.component";
import {CheckoutDetailComponent} from "./checkout/checkout-detail/checkout-detail.component";
import {CheckoutComponent} from "./checkout/checkout/checkout.component";
import {AddressDeleteComponent} from "./childs/address/address-delete/address-delete.component";
import {AddressDetailsComponent} from "./childs/address/address-details/address-details.component";
import {AddressDtoRestService} from "./childs/address/address-dto-rest.service";
import {AddressEditComponent} from "./childs/address/address-edit/address-edit.component";
import {AddressOverviewComponent} from "./childs/address/address-overview/address-overview.component";
import {AddressSettingsService} from "./childs/address/address-settings.service";
import {AddressTableComponent} from "./childs/address/address-table/address-table.component";
import {AdministrationComponent} from "./childs/administration/administration.component";
import {ArticleDeleteComponent} from "./childs/article/article-delete/article-delete.component";
import {ArticleDetailsComponent} from "./childs/article/article-details/article-details.component";
import {ArticleDtoRestService} from "./childs/article/article-dto-rest.service";
import {ArticleEditComponent} from "./childs/article/article-edit/article-edit.component";
import {ArticleOverviewComponent} from "./childs/article/article-overview/article-overview.component";
import {ArticleSettingsService} from "./childs/article/article-settings.service";
import {ArticleTableComponent} from "./childs/article/article-table/article-table.component";
import {OpeningHourDeleteComponent} from "./childs/opening-hour/opening-hour-delete/opening-hour-delete.component";
import {OpeningHourDetailsComponent} from "./childs/opening-hour/opening-hour-details/opening-hour-details.component";
import {OpeningHourEditComponent} from "./childs/opening-hour/opening-hour-edit/opening-hour-edit.component";
import {OpeningHourOverviewComponent} from "./childs/opening-hour/opening-hour-overview/opening-hour-overview.component";
import {OpeningHourTableComponent} from "./childs/opening-hour/opening-hour-table/opening-hour-table.component";
import {PickupLocationDeleteComponent} from "./childs/pickup-location/pickup-location-delete/pickup-location-delete.component";
import {PickupLocationDetailOnlyComponent} from "./childs/pickup-location/pickup-location-detail-only/pickup-location-detail-only.component";
import {PickupLocationDetailComponent} from "./childs/pickup-location/pickup-location-detail/pickup-location-detail.component";
import {PickupLocationEditComponent} from "./childs/pickup-location/pickup-location-edit/pickup-location-edit.component";
import {PickupLocationOverviewComponent} from "./childs/pickup-location/pickup-location-overview/pickup-location-overview.component";
import {PickupLocationTableComponent} from "./childs/pickup-location/pickup-location-table/pickup-location-table.component";
import {UnitOfMeasurementDeleteComponent} from "./childs/unit-of-measurement/unit-of-measurement-delete/unit-of-measurement-delete.component";
import {UnitOfMeasurementDetailsComponent} from "./childs/unit-of-measurement/unit-of-measurement-details/unit-of-measurement-details.component";
import {UnitOfMeasurementDtoRestService} from "./childs/unit-of-measurement/unit-of-measurement-dto-rest.service";
import {UnitOfMeasurementEditComponent} from "./childs/unit-of-measurement/unit-of-measurement-edit/unit-of-measurement-edit.component";
import {UnitOfMeasurementOverviewComponent} from "./childs/unit-of-measurement/unit-of-measurement-overview/unit-of-measurement-overview.component";
import {UnitOfMeasurementSettingsService} from "./childs/unit-of-measurement/unit-of-measurement-settings.service";
import {UnitOfMeasurementTableComponent} from "./childs/unit-of-measurement/unit-of-measurement-table/unit-of-measurement-table.component";
import {UserInfoDeleteComponent} from "./childs/user/user-info-delete/user-info-delete.component";
import {UserInfoDetailsComponent} from "./childs/user/user-info-details/user-info-details.component";
import {UserInfoDtoRestService} from "./childs/user/user-info-dto-rest.service";
import {UserInfoEditComponent} from "./childs/user/user-info-edit/user-info-edit.component";
import {UserInfoOverviewComponent} from "./childs/user/user-info-overview/user-info-overview.component";
import {UserInfoPasswordChangeComponent} from "./childs/user/user-info-password-change/user-info-password-change.component";
import {UserDetailsSettingsService} from "./childs/user/user-info-settings.service";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {PublicArticleDetailComponent} from "./dashboard/public-article-detail/public-article-detail.component";
import {PublicArticleDtoRestService} from "./dashboard/public-article-dto-rest.service";
import {PublicArticleListComponent} from "./dashboard/public-article-list/public-article-list.component";
import {LoginComponent} from "./login/login.component";
import {LogoutComponent} from "./logout/logout.component";
import {AppRouteModule} from "./router/app-route.module";
import {RestUrlPrefixService} from "./table-support/rest-url-prefix.service";
import {TableSupportModule} from "./table-support/table-support.module";

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AdministrationComponent,
    AddressOverviewComponent,
    AddressEditComponent,
    AddressDetailsComponent,
    AddressTableComponent,
    AddressDeleteComponent,
    UserInfoDeleteComponent,
    UserInfoDetailsComponent,
    UserInfoEditComponent,
    UserInfoOverviewComponent,
    ArticleDeleteComponent,
    ArticleDetailsComponent,
    ArticleEditComponent,
    ArticleOverviewComponent,
    LoginComponent,
    UserInfoPasswordChangeComponent,
    LogoutComponent,
    PasswordChangeComponent,
    ChangeMyPasswordComponent,
    UnitOfMeasurementDeleteComponent,
    UnitOfMeasurementDetailsComponent,
    UnitOfMeasurementEditComponent,
    UnitOfMeasurementOverviewComponent,
    UnitOfMeasurementTableComponent,
    ArticleTableComponent,
    PublicArticleDetailComponent,
    ShoppingCartComponent,
    PublicArticleListComponent,
    CheckoutComponent,
    PickupLocationOverviewComponent,
    PickupLocationTableComponent,
    PickupLocationEditComponent,
    PickupLocationDeleteComponent,
    PickupLocationDetailComponent,
    OpeningHourTableComponent,
    OpeningHourOverviewComponent,
    OpeningHourEditComponent,
    OpeningHourDeleteComponent,
    OpeningHourDetailsComponent,
    PickupLocationDetailOnlyComponent,
    CheckoutDetailComponent,
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
    MatMomentDateModule,
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
    MatMenuModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatStepperModule,
    MatTabsModule,
    MatRadioModule,
  ],
  providers: [
    MatIconRegistry,
    RestUrlPrefixService,
    AddressDtoRestService,
    AddressSettingsService,
    UserDetailsSettingsService,
    UserInfoDtoRestService,
    UnitOfMeasurementDtoRestService,
    UnitOfMeasurementSettingsService,
    ArticleDtoRestService,
    PublicArticleDtoRestService,
    ArticleSettingsService,
    CartService,
    AuthGuard,
    AuthGuardAdmin,
    AuthenticationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
