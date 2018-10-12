import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatDividerModule,
  MatFormFieldModule,
  MatGridListModule,
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
import {MAT_MOMENT_DATE_FORMATS, MatMomentDateModule, MomentDateAdapter} from "@angular/material-moment-adapter";
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
import {ArticleCheckinDeleteComponent} from "./childs/article-checkin/article-checkin-delete/article-checkin-delete.component";
import {ArticleCheckinDetailComponent} from "./childs/article-checkin/article-checkin-detail/article-checkin-detail.component";
import {ArticleCheckinEditComponent} from "./childs/article-checkin/article-checkin-edit/article-checkin-edit.component";
import {ArticleCheckinOverviewComponent} from "./childs/article-checkin/article-checkin-overview/article-checkin-overview.component";
import {ArticleCheckinTableComponent} from "./childs/article-checkin/article-checkin-table/article-checkin-table.component";
import {ArticleCheckoutDeleteComponent} from "./childs/article-checkout/article-checkout-delete/article-checkout-delete.component";
import {ArticleCheckoutDetailComponent} from "./childs/article-checkout/article-checkout-detail/article-checkout-detail.component";
import {ArticleCheckoutEditComponent} from "./childs/article-checkout/article-checkout-edit/article-checkout-edit.component";
import {ArticleCheckoutOverviewComponent} from "./childs/article-checkout/article-checkout-overview/article-checkout-overview.component";
import {ArticleCheckoutTableComponent} from "./childs/article-checkout/article-checkout-table/article-checkout-table.component";
import {ArticleStockDeleteComponent} from "./childs/article-stock/article-stock-delete/article-stock-delete.component";
import {ArticleStockDetailComponent} from "./childs/article-stock/article-stock-detail/article-stock-detail.component";
import {ArticleStockEditComponent} from "./childs/article-stock/article-stock-edit/article-stock-edit.component";
import {ArticleStockOverviewComponent} from "./childs/article-stock/article-stock-overview/article-stock-overview.component";
import {ArticleStockTableComponent} from "./childs/article-stock/article-stock-table/article-stock-table.component";
import {ArticleDeleteComponent} from "./childs/article/article-delete/article-delete.component";
import {ArticleDetailsComponent} from "./childs/article/article-details/article-details.component";
import {ArticleDtoRestService} from "./childs/article/article-dto-rest.service";
import {ArticleEditComponent} from "./childs/article/article-edit/article-edit.component";
import {ArticleOverviewComponent} from "./childs/article/article-overview/article-overview.component";
import {ArticleSettingsService} from "./childs/article/article-settings.service";
import {ArticleTableComponent} from "./childs/article/article-table/article-table.component";
import {CustomerOrderItemDeleteComponent} from "./childs/customer-order-item/customer-order-item-delete/customer-order-item-delete.component";
import {CustomerOrderItemDetailComponent} from "./childs/customer-order-item/customer-order-item-detail/customer-order-item-detail.component";
import {CustomerOrderItemEditComponent} from "./childs/customer-order-item/customer-order-item-edit/customer-order-item-edit.component";
import {CustomerOrderItemOverviewComponent} from "./childs/customer-order-item/customer-order-item-overview/customer-order-item-overview.component";
import {CustomerOrderItemTableComponent} from "./childs/customer-order-item/customer-order-item-table/customer-order-item-table.component";
import {CustomerOrderDeleteComponent} from "./childs/customer-order/customer-order-delete/customer-order-delete.component";
import {CustomerOrderDetailOnlyComponent} from "./childs/customer-order/customer-order-detail-only/customer-order-detail-only.component";
import {CustomerOrderDetailComponent} from "./childs/customer-order/customer-order-detail/customer-order-detail.component";
import {CustomerOrderEditComponent} from "./childs/customer-order/customer-order-edit/customer-order-edit.component";
import {CustomerOrderOverviewComponent} from "./childs/customer-order/customer-order-overview/customer-order-overview.component";
import {CustomerOrderTableComponent} from "./childs/customer-order/customer-order-table/customer-order-table.component";
import {LocationDeleteComponent} from "./childs/location/location-delete/location-delete.component";
import {LocationDetailOnlyComponent} from "./childs/location/location-detail-only/location-detail-only.component";
import {LocationDetailComponent} from "./childs/location/location-detail/location-detail.component";
import {LocationEditComponent} from "./childs/location/location-edit/location-edit.component";
import {LocationOverviewComponent} from "./childs/location/location-overview/location-overview.component";
import {LocationTableComponent} from "./childs/location/location-table/location-table.component";
import {OpeningHourDeleteComponent} from "./childs/opening-hour/opening-hour-delete/opening-hour-delete.component";
import {OpeningHourDetailsComponent} from "./childs/opening-hour/opening-hour-details/opening-hour-details.component";
import {OpeningHourEditComponent} from "./childs/opening-hour/opening-hour-edit/opening-hour-edit.component";
import {OpeningHourOverviewComponent} from "./childs/opening-hour/opening-hour-overview/opening-hour-overview.component";
import {OpeningHourTableComponent} from "./childs/opening-hour/opening-hour-table/opening-hour-table.component";
import {RoleDeleteComponent} from "./childs/role/role-delete/role-delete.component";
import {RoleDetailComponent} from "./childs/role/role-detail/role-detail.component";
import {RoleEditComponent} from "./childs/role/role-edit/role-edit.component";
import {RoleOverviewComponent} from "./childs/role/role-overview/role-overview.component";
import {RoleTableComponent} from "./childs/role/role-table/role-table.component";
import {UnitOfMeasurementDeleteComponent} from "./childs/unit-of-measurement/unit-of-measurement-delete/unit-of-measurement-delete.component";
import {UnitOfMeasurementDetailsComponent} from "./childs/unit-of-measurement/unit-of-measurement-details/unit-of-measurement-details.component";
import {UnitOfMeasurementDtoRestService} from "./childs/unit-of-measurement/unit-of-measurement-dto-rest.service";
import {UnitOfMeasurementEditComponent} from "./childs/unit-of-measurement/unit-of-measurement-edit/unit-of-measurement-edit.component";
import {UnitOfMeasurementOverviewComponent} from "./childs/unit-of-measurement/unit-of-measurement-overview/unit-of-measurement-overview.component";
import {UnitOfMeasurementSettingsService} from "./childs/unit-of-measurement/unit-of-measurement-settings.service";
import {UnitOfMeasurementTableComponent} from "./childs/unit-of-measurement/unit-of-measurement-table/unit-of-measurement-table.component";
import {RoleDtoRestService} from "./childs/user/role-dto-rest.service";
import {UserInfoDeleteComponent} from "./childs/user/user-delete/user-info-delete.component";
import {UserInfoDetailsComponent} from "./childs/user/user-details/user-info-details.component";
import {UserDtoRestService} from "./childs/user/user-dto-rest.service";
import {UserEditComponent} from "./childs/user/user-edit/user-edit.component";
import {UserDetailsSettingsService} from "./childs/user/user-info-settings.service";
import {UserOverviewComponent} from "./childs/user/user-overview/user-overview.component";
import {UserPasswordChangeComponent} from "./childs/user/user-password-change/user-password-change.component";
import {UserWithRolesDtoRestService} from "./childs/user/user-with-roles-dto-rest.service";
import {ArticleInSaleDtoRestService} from "./dashboard/article-in-sale--dto-rest.service";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {PublicArticleGridComponent} from "./dashboard/public-article-grid/public-article-grid.component";
import {PublicArticleListComponent} from "./dashboard/public-article-list/public-article-list.component";
import {LoginComponent} from "./login/login.component";
import {LogoutComponent} from "./logout/logout.component";
import {AppRouteModule} from "./router/app-route.module";
import {SaleOverviewComponent} from "./sales/sale-overview/sale-overview.component";
import {OutputMessageComponent} from "./table-support/error-output/output-message.component";
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
    UserEditComponent,
    UserOverviewComponent,
    ArticleDeleteComponent,
    ArticleDetailsComponent,
    ArticleEditComponent,
    ArticleOverviewComponent,
    LoginComponent,
    UserPasswordChangeComponent,
    LogoutComponent,
    PasswordChangeComponent,
    ChangeMyPasswordComponent,
    UnitOfMeasurementDeleteComponent,
    UnitOfMeasurementDetailsComponent,
    UnitOfMeasurementEditComponent,
    UnitOfMeasurementOverviewComponent,
    UnitOfMeasurementTableComponent,
    ArticleTableComponent,
    ShoppingCartComponent,
    PublicArticleListComponent,
    CheckoutComponent,
    LocationOverviewComponent,
    LocationTableComponent,
    LocationEditComponent,
    LocationDeleteComponent,
    LocationDetailComponent,
    OpeningHourTableComponent,
    OpeningHourOverviewComponent,
    OpeningHourEditComponent,
    OpeningHourDeleteComponent,
    OpeningHourDetailsComponent,
    LocationDetailOnlyComponent,
    CheckoutDetailComponent,
    CustomerOrderDeleteComponent,
    CustomerOrderDetailComponent,
    CustomerOrderDetailOnlyComponent,
    CustomerOrderEditComponent,
    CustomerOrderOverviewComponent,
    CustomerOrderTableComponent,
    CustomerOrderItemTableComponent,
    CustomerOrderItemDeleteComponent,
    CustomerOrderItemDetailComponent,
    CustomerOrderItemEditComponent,
    CustomerOrderItemOverviewComponent,
    PublicArticleGridComponent,
    RoleDeleteComponent,
    RoleDetailComponent,
    RoleEditComponent,
    RoleOverviewComponent,
    RoleTableComponent,
    OutputMessageComponent,
    SaleOverviewComponent,
    ArticleStockDeleteComponent,
    ArticleStockDetailComponent,
    ArticleStockEditComponent,
    ArticleStockOverviewComponent,
    ArticleStockTableComponent,
    ArticleCheckinDeleteComponent,
    ArticleCheckinDetailComponent,
    ArticleCheckinOverviewComponent,
    ArticleCheckinTableComponent,
    ArticleCheckinEditComponent,
    ArticleCheckoutDeleteComponent,
    ArticleCheckoutEditComponent,
    ArticleCheckoutOverviewComponent,
    ArticleCheckoutTableComponent,
    ArticleCheckoutDetailComponent,
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
    MatDividerModule,
    MatGridListModule,
  ],
  providers: [
    MatIconRegistry,
    RestUrlPrefixService,
    AddressDtoRestService,
    AddressSettingsService,
    UserDetailsSettingsService,
    UserDtoRestService,
    UnitOfMeasurementDtoRestService,
    UnitOfMeasurementSettingsService,
    ArticleDtoRestService,
    ArticleInSaleDtoRestService,
    ArticleSettingsService,
    UserWithRolesDtoRestService,
    RoleDtoRestService,
    CartService,
    AuthGuard,
    AuthGuardAdmin,
    AuthenticationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {provide: MAT_DATE_LOCALE, useValue: "de_ch"},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
