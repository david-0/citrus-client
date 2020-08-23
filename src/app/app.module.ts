import {registerLocaleData} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import localeDeCH from "@angular/common/locales/de-CH";
import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MAT_MOMENT_DATE_FORMATS, MatMomentDateModule, MomentDateAdapter} from "@angular/material-moment-adapter";
import {MatBadgeModule} from "@angular/material/badge";
import {MatButtonModule} from "@angular/material/button";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatCardModule} from "@angular/material/card";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatChipsModule} from "@angular/material/chips";
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule} from "@angular/material/core";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatDividerModule} from "@angular/material/divider";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatIconModule, MatIconRegistry} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatMenuModule} from "@angular/material/menu";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatRadioModule} from "@angular/material/radio";
import {MatSelectModule} from "@angular/material/select";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatSortModule} from "@angular/material/sort";
import {MatStepperModule} from "@angular/material/stepper";
import {MatTableModule} from "@angular/material/table";
import {MatTabsModule} from "@angular/material/tabs";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatTooltipModule} from "@angular/material/tooltip";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {JwtModule} from "@auth0/angular-jwt";
import {ValidatorsModule} from "ng2-validators";
import {ENV_PROVIDERS} from "../environments/environment";

import {AppComponent} from "./app.component";
import {AuthenticationService} from "./authentication/authentication.service";
import {PasswordChangeComponent} from "./authentication/password-change/password-change.component";
import {EqualValidator} from "./base/equals-validator.directives";
import {WINDOW_PROVIDERS} from "./base/window-provider";
import {CartService} from "./cart/cart.service";
import {ShoppingCartDetailComponent} from "./cart/shopping-cart-detail/shopping-cart-detail.component";
import {ShoppingCartViewComponent} from "./cart/shopping-cart-view/shopping-cart-view.component";
import {ShoppingCartComponent} from "./cart/shopping-cart/shopping-cart.component";
import {ChangeMyPasswordComponent} from "./change-my-password/change-my-password.component";
import {CartLocationDetailComponent} from "./checkout/cart-location-detail/cart-location-detail.component";
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
import {ImageDtoRestService} from "./childs/article/image-dto-rest.service";
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
import {OrderArchivingTableComponent} from "./childs/order-archiving/order-archiving-table/order-archiving-table.component";
import {OrderItemDeleteComponent} from "./childs/order-item/order-item-delete/order-item-delete.component";
import {OrderItemDetailComponent} from "./childs/order-item/order-item-detail/order-item-detail.component";
import {OrderItemEditComponent} from "./childs/order-item/order-item-edit/order-item-edit.component";
import {OrderItemOverviewComponent} from "./childs/order-item/order-item-overview/order-item-overview.component";
import {OrderItemTableComponent} from "./childs/order-item/order-item-table/order-item-table.component";
import {OrderDeleteComponent} from "./childs/order/order-delete/order-delete.component";
import {OrderDetailOnlyComponent} from "./childs/order/order-detail-only/order-detail-only.component";
import {OrderDetailComponent} from "./childs/order/order-detail/order-detail.component";
import {OrderEditComponent} from "./childs/order/order-edit/order-edit.component";
import {OrderOverviewComponent} from "./childs/order/order-overview/order-overview.component";
import {OrderTableComponent} from "./childs/order/order-table/order-table.component";
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
import {PublicArticleDetailComponent} from "./dashboard/public-article-detail/public-article-detail.component";
import {PublicArticleStockGridComponent} from "./dashboard/public-article-stock-grid/public-article-stock-grid.component";
import {AboutUsComponent} from "./footer/about-us/about-us.component";
import {ContactComponent} from "./footer/contact/contact.component";
import {OrganisationComponent} from "./footer/organisation/organisation.component";
import {PrivacyPolicyComponent} from "./footer/privacy-policy/privacy-policy.component";
import {LoginComponent} from "./login/login.component";
import {LogoutComponent} from "./logout/logout.component";
import {AppRouteModule} from "./router/app-route.module";
import {SaleHeaderComponent} from "./sales/sale-header/sale-header.component";
import {SaleLocationComponent} from "./sales/sale-location/sale-location.component";
import {SaleOrderComponent} from "./sales/sale-order/sale-order.component";
import {SaleOverviewComponent} from "./sales/sale-overview/sale-overview.component";
import {StoreCheckInComponent} from "./store/store-check-in/store-check-in.component";
import {StoreCheckOutComponent} from "./store/store-check-out/store-check-out.component";
import {StoreEstimateComponent} from "./store/store-estimate/store-estimate.component";
import {OutputMessageComponent} from "./table-support/error-output/output-message.component";
import {MySpinnerModule} from "./table-support/my-spinner/my-spinner.module";
import {TableSupportModule} from "./table-support/table-support.module";
import {RegisterComponent} from "./usermanagement/register/register.component";
import {ResetMailConfirmationComponent} from "./usermanagement/reset-mail-confirmation/reset-mail-confirmation.component";
import {ResetMailComponent} from "./usermanagement/reset-mail/reset-mail.component";
import {ResetPasswortWithTokenComponent} from "./usermanagement/reset-password-with-token/reset-passwort-with-token.component";
import {UserConfirmationComponent} from "./usermanagement/user-confirmation/user-confirmation.component";
import { OrderArchivingOverviewComponent } from './childs/order-archiving/order-archiving-overview/order-archiving-overview.component';
import { OrderArchivingDetailComponent } from './childs/order-archiving/order-archiving-detail/order-archiving-detail.component';
import { OrderArchiveTableComponent } from './childs/order-archive/order-archive-table/order-archive-table.component';
import { OrderArchiveOverviewComponent } from './childs/order-archive/order-archive-overview/order-archive-overview.component';
import { OrderArchiveDetailComponent } from './childs/order-archive/order-archive-detail/order-archive-detail.component';
import { OrderArchiveDetailOnlyComponent } from './childs/order-archive/order-archive-detail-only/order-archive-detail-only.component';
import { OrderArchiveDeleteComponent } from './childs/order-archive/order-archive-delete/order-archive-delete.component';
import { SendEmailToAllComponent } from './message/send-email-to-all/send-email-to-all.component';
import { SendHeaderComponent } from './message/send-header/send-header.component';
import { DeliveryNoteOverviewComponent } from './childs/delivery-note/delivery-note-overview/delivery-note-overview.component';
import { DeliveryNoteTableComponent } from './childs/delivery-note/delivery-note-table/delivery-note-table.component';
import { DeliveryNoteDetailComponent } from './childs/delivery-note/delivery-note-detail/delivery-note-detail.component';

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
    OrderDeleteComponent,
    OrderDetailComponent,
    OrderDetailOnlyComponent,
    OrderEditComponent,
    OrderOverviewComponent,
    OrderTableComponent,
    OrderItemTableComponent,
    OrderItemDeleteComponent,
    OrderItemDetailComponent,
    OrderItemEditComponent,
    OrderItemOverviewComponent,
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
    PublicArticleStockGridComponent,
    CartLocationDetailComponent,
    StoreCheckInComponent,
    StoreCheckOutComponent,
    StoreEstimateComponent,
    SaleOrderComponent,
    SaleLocationComponent,
    SaleHeaderComponent,
    PublicArticleDetailComponent,
    ShoppingCartViewComponent,
    ShoppingCartDetailComponent,
    RegisterComponent,
    ResetMailComponent,
    ResetPasswortWithTokenComponent,
    ResetMailConfirmationComponent,
    EqualValidator,
    UserConfirmationComponent,
    AboutUsComponent,
    PrivacyPolicyComponent,
    OrganisationComponent,
    ContactComponent,
    OrderArchivingTableComponent,
    OrderArchivingOverviewComponent,
    OrderArchivingDetailComponent,
    OrderArchiveTableComponent,
    OrderArchiveOverviewComponent,
    OrderArchiveDetailComponent,
    OrderArchiveDetailOnlyComponent,
    OrderArchiveDeleteComponent,
    SendEmailToAllComponent,
    SendHeaderComponent,
    DeliveryNoteOverviewComponent,
    DeliveryNoteTableComponent,
    DeliveryNoteDetailComponent,
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
    MySpinnerModule,
    MatChipsModule,
    MatBadgeModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: AuthenticationService.getAccessToken,
        whitelistedDomains: [
          "localhost:3001",
        ]
      }
    }),
  ],
  providers: [
    MatIconRegistry,
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
    ImageDtoRestService,
    AuthenticationService,
    {provide: MAT_DATE_LOCALE, useValue: "de_ch"},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    WINDOW_PROVIDERS,
    ENV_PROVIDERS,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    registerLocaleData(localeDeCH);
  }
}
