import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {AuthGuardAdmin} from "../authentication/auth-guard-admin.service";
import {AuthGuardSale} from "../authentication/auth-guard-sale.service";
import {AuthGuard} from "../authentication/auth-guard.service";
import {ChangeMyPasswordComponent} from "../change-my-password/change-my-password.component";
import {CheckoutComponent} from "../checkout/checkout/checkout.component";
import {AddressDeleteComponent} from "../childs/address/address-delete/address-delete.component";
import {AddressDetailsComponent} from "../childs/address/address-details/address-details.component";
import {AddressEditComponent} from "../childs/address/address-edit/address-edit.component";
import {AddressOverviewComponent} from "../childs/address/address-overview/address-overview.component";
import {AdministrationComponent} from "../childs/administration/administration.component";
import {ArticleCheckinDeleteComponent} from "../childs/article-checkin/article-checkin-delete/article-checkin-delete.component";
import {ArticleCheckinDetailComponent} from "../childs/article-checkin/article-checkin-detail/article-checkin-detail.component";
import {ArticleCheckinEditComponent} from "../childs/article-checkin/article-checkin-edit/article-checkin-edit.component";
import {ArticleCheckinOverviewComponent} from "../childs/article-checkin/article-checkin-overview/article-checkin-overview.component";
import {ArticleCheckoutDeleteComponent} from "../childs/article-checkout/article-checkout-delete/article-checkout-delete.component";
import {ArticleCheckoutDetailComponent} from "../childs/article-checkout/article-checkout-detail/article-checkout-detail.component";
import {ArticleCheckoutEditComponent} from "../childs/article-checkout/article-checkout-edit/article-checkout-edit.component";
import {ArticleCheckoutOverviewComponent} from "../childs/article-checkout/article-checkout-overview/article-checkout-overview.component";
import {ArticleStockDeleteComponent} from "../childs/article-stock/article-stock-delete/article-stock-delete.component";
import {ArticleStockDetailComponent} from "../childs/article-stock/article-stock-detail/article-stock-detail.component";
import {ArticleStockEditComponent} from "../childs/article-stock/article-stock-edit/article-stock-edit.component";
import {ArticleStockOverviewComponent} from "../childs/article-stock/article-stock-overview/article-stock-overview.component";
import {ArticleDeleteComponent} from "../childs/article/article-delete/article-delete.component";
import {ArticleDetailsComponent} from "../childs/article/article-details/article-details.component";
import {ArticleEditComponent} from "../childs/article/article-edit/article-edit.component";
import {ArticleOverviewComponent} from "../childs/article/article-overview/article-overview.component";
import {CustomerOrderItemDeleteComponent} from "../childs/customer-order-item/customer-order-item-delete/customer-order-item-delete.component";
import {CustomerOrderItemDetailComponent} from "../childs/customer-order-item/customer-order-item-detail/customer-order-item-detail.component";
import {CustomerOrderItemEditComponent} from "../childs/customer-order-item/customer-order-item-edit/customer-order-item-edit.component";
import {CustomerOrderItemOverviewComponent} from "../childs/customer-order-item/customer-order-item-overview/customer-order-item-overview.component";
import {CustomerOrderDeleteComponent} from "../childs/customer-order/customer-order-delete/customer-order-delete.component";
import {CustomerOrderDetailComponent} from "../childs/customer-order/customer-order-detail/customer-order-detail.component";
import {CustomerOrderEditComponent} from "../childs/customer-order/customer-order-edit/customer-order-edit.component";
import {CustomerOrderOverviewComponent} from "../childs/customer-order/customer-order-overview/customer-order-overview.component";
import {LocationDeleteComponent} from "../childs/location/location-delete/location-delete.component";
import {LocationDetailComponent} from "../childs/location/location-detail/location-detail.component";
import {LocationEditComponent} from "../childs/location/location-edit/location-edit.component";
import {LocationOverviewComponent} from "../childs/location/location-overview/location-overview.component";
import {OpeningHourDeleteComponent} from "../childs/opening-hour/opening-hour-delete/opening-hour-delete.component";
import {OpeningHourDetailsComponent} from "../childs/opening-hour/opening-hour-details/opening-hour-details.component";
import {OpeningHourEditComponent} from "../childs/opening-hour/opening-hour-edit/opening-hour-edit.component";
import {OpeningHourOverviewComponent} from "../childs/opening-hour/opening-hour-overview/opening-hour-overview.component";
import {RoleDeleteComponent} from "../childs/role/role-delete/role-delete.component";
import {RoleDetailComponent} from "../childs/role/role-detail/role-detail.component";
import {RoleEditComponent} from "../childs/role/role-edit/role-edit.component";
import {RoleOverviewComponent} from "../childs/role/role-overview/role-overview.component";
import {UnitOfMeasurementDeleteComponent} from "../childs/unit-of-measurement/unit-of-measurement-delete/unit-of-measurement-delete.component";
import {UnitOfMeasurementDetailsComponent} from "../childs/unit-of-measurement/unit-of-measurement-details/unit-of-measurement-details.component";
import {UnitOfMeasurementEditComponent} from "../childs/unit-of-measurement/unit-of-measurement-edit/unit-of-measurement-edit.component";
import {UnitOfMeasurementOverviewComponent} from "../childs/unit-of-measurement/unit-of-measurement-overview/unit-of-measurement-overview.component";
import {UserInfoDeleteComponent} from "../childs/user/user-delete/user-info-delete.component";
import {UserInfoDetailsComponent} from "../childs/user/user-details/user-info-details.component";
import {UserEditComponent} from "../childs/user/user-edit/user-edit.component";
import {UserOverviewComponent} from "../childs/user/user-overview/user-overview.component";
import {UserPasswordChangeComponent} from "../childs/user/user-password-change/user-password-change.component";
import {DashboardComponent} from "../dashboard/dashboard.component";
import {LoginComponent} from "../login/login.component";
import {LogoutComponent} from "../logout/logout.component";
import {SaleOverviewComponent} from "../sales/sale-overview/sale-overview.component";

const routes: Routes = [
  {path: "", redirectTo: "dashboard", pathMatch: "full"},
  {path: "dashboard", component: DashboardComponent},
  {path: "login", component: LoginComponent},
  {path: "logout", component: LogoutComponent},
  {path: "checkout/:id", canActivate: [AuthGuard], component: CheckoutComponent},
  {path: "changeMyPassword", component: ChangeMyPasswordComponent},
  {path: "sale", canActivate: [AuthGuard, AuthGuardSale], component: SaleOverviewComponent},
  {
    path: "administration", canActivate: [AuthGuard, AuthGuardAdmin], component: AdministrationComponent, children: [
      {path: "address", canActivate: [AuthGuard, AuthGuardAdmin], component: AddressOverviewComponent},
      {path: "address/create", canActivate: [AuthGuard, AuthGuardAdmin], component: AddressEditComponent},
      {path: "address/:id", canActivate: [AuthGuard, AuthGuardAdmin], component: AddressDetailsComponent},
      {path: "address/:id/edit", canActivate: [AuthGuard, AuthGuardAdmin], component: AddressEditComponent},
      {path: "address/:id/delete", canActivate: [AuthGuard, AuthGuardAdmin], component: AddressDeleteComponent},
      {path: "user", canActivate: [AuthGuard, AuthGuardAdmin], component: UserOverviewComponent},
      {path: "user/create", canActivate: [AuthGuard, AuthGuardAdmin], component: UserEditComponent},
      {path: "user/:id", canActivate: [AuthGuard, AuthGuardAdmin], component: UserInfoDetailsComponent},
      {path: "user/:id/edit", canActivate: [AuthGuard, AuthGuardAdmin], component: UserEditComponent},
      {path: "user/:id/delete", canActivate: [AuthGuard, AuthGuardAdmin], component: UserInfoDeleteComponent},
      {
        path: "user/:id/passwordChange",
        canActivate: [AuthGuard, AuthGuardAdmin],
        component: UserPasswordChangeComponent
      },
      {
        path: "unitOfMeasurement",
        canActivate: [AuthGuard, AuthGuardAdmin],
        component: UnitOfMeasurementOverviewComponent
      },
      {
        path: "unitOfMeasurement/create",
        canActivate: [AuthGuard, AuthGuardAdmin],
        component: UnitOfMeasurementEditComponent
      },
      {
        path: "unitOfMeasurement/:id",
        canActivate: [AuthGuard, AuthGuardAdmin],
        component: UnitOfMeasurementDetailsComponent
      },
      {
        path: "unitOfMeasurement/:id/edit",
        canActivate: [AuthGuard, AuthGuardAdmin],
        component: UnitOfMeasurementEditComponent
      },
      {
        path: "unitOfMeasurement/:id/delete",
        canActivate: [AuthGuard, AuthGuardAdmin],
        component: UnitOfMeasurementDeleteComponent
      },
      {path: "role", canActivate: [AuthGuard, AuthGuardAdmin], component: RoleOverviewComponent},
      {path: "role/create", canActivate: [AuthGuard, AuthGuardAdmin], component: RoleEditComponent},
      {path: "role/:id", canActivate: [AuthGuard, AuthGuardAdmin], component: RoleDetailComponent},
      {path: "role/:id/edit", canActivate: [AuthGuard, AuthGuardAdmin], component: RoleEditComponent},
      {path: "role/:id/delete", canActivate: [AuthGuard, AuthGuardAdmin], component: RoleDeleteComponent},
      {path: "article", canActivate: [AuthGuard, AuthGuardAdmin], component: ArticleOverviewComponent},
      {path: "article/create", canActivate: [AuthGuard, AuthGuardAdmin], component: ArticleEditComponent},
      {path: "article/:id", canActivate: [AuthGuard, AuthGuardAdmin], component: ArticleDetailsComponent},
      {path: "article/:id/edit", canActivate: [AuthGuard, AuthGuardAdmin], component: ArticleEditComponent},
      {path: "article/:id/delete", canActivate: [AuthGuard, AuthGuardAdmin], component: ArticleDeleteComponent},

      {path: "articleStock", canActivate: [AuthGuard, AuthGuardAdmin], component: ArticleStockOverviewComponent},
      {path: "articleStock/create", canActivate: [AuthGuard, AuthGuardAdmin], component: ArticleStockEditComponent},
      {path: "articleStock/:id", canActivate: [AuthGuard, AuthGuardAdmin], component: ArticleStockDetailComponent},
      {path: "articleStock/:id/edit", canActivate: [AuthGuard, AuthGuardAdmin], component: ArticleStockEditComponent},
      {
        path: "articleStock/:id/delete",
        canActivate: [AuthGuard, AuthGuardAdmin],
        component: ArticleStockDeleteComponent
      },

      {path: "articleCheckIn", canActivate: [AuthGuard, AuthGuardAdmin], component: ArticleCheckinOverviewComponent},
      {path: "articleCheckIn/create", canActivate: [AuthGuard, AuthGuardAdmin], component: ArticleCheckinEditComponent},
      {path: "articleCheckIn/:id", canActivate: [AuthGuard, AuthGuardAdmin], component: ArticleCheckinDetailComponent},
      {
        path: "articleCheckIn/:id/edit",
        canActivate: [AuthGuard, AuthGuardAdmin],
        component: ArticleCheckinEditComponent
      },
      {
        path: "articleCheckIn/:id/delete",
        canActivate: [AuthGuard, AuthGuardAdmin],
        component: ArticleCheckinDeleteComponent
      },
      
      {path: "articleCheckOut", canActivate: [AuthGuard, AuthGuardAdmin], component: ArticleCheckoutOverviewComponent},
      {
        path: "articleCheckOut/create",
        canActivate: [AuthGuard, AuthGuardAdmin],
        component: ArticleCheckoutEditComponent
      },
      {
        path: "articleCheckOut/:id",
        canActivate: [AuthGuard, AuthGuardAdmin],
        component: ArticleCheckoutDetailComponent
      },
      {
        path: "articleCheckOut/:id/edit",
        canActivate: [AuthGuard, AuthGuardAdmin],
        component: ArticleCheckoutEditComponent
      },
      {
        path: "articleCheckOut/:id/delete",
        canActivate: [AuthGuard, AuthGuardAdmin],
        component: ArticleCheckoutDeleteComponent
      },

      {path: "order", canActivate: [AuthGuard, AuthGuardAdmin], component: CustomerOrderOverviewComponent},
      {path: "order/create", canActivate: [AuthGuard, AuthGuardAdmin], component: CustomerOrderEditComponent},
      {path: "order/:id", canActivate: [AuthGuard, AuthGuardAdmin], component: CustomerOrderDetailComponent},
      {
        path: "order/:id/edit",
        canActivate: [AuthGuard, AuthGuardAdmin],
        component: CustomerOrderEditComponent,
        children: [
          {
            path: "orderItem",
            canActivate: [AuthGuard, AuthGuardAdmin],
            component: CustomerOrderItemOverviewComponent,
            outlet: "orderItem"
          },
          {
            path: "orderItem/create",
            canActivate: [AuthGuard, AuthGuardAdmin],
            component: CustomerOrderItemEditComponent,
            outlet: "orderItem"
          },
          {
            path: "orderItem/:id",
            canActivate: [AuthGuard, AuthGuardAdmin],
            component: CustomerOrderItemDetailComponent,
            outlet: "orderItem"
          },
          {
            path: "orderItem/:id/edit",
            canActivate: [AuthGuard, AuthGuardAdmin],
            component: CustomerOrderItemEditComponent,
            outlet: "orderItem"
          },
          {
            path: "orderItem/:id/delete",
            canActivate: [AuthGuard, AuthGuardAdmin],
            component: CustomerOrderItemDeleteComponent,
            outlet: "orderItem"
          },
        ]
      },
      {
        path: "order/:id/delete",
        canActivate: [AuthGuard, AuthGuardAdmin],
        component: CustomerOrderDeleteComponent
      },

      {path: "location", canActivate: [AuthGuard, AuthGuardAdmin], component: LocationOverviewComponent},
      {path: "location/create", canActivate: [AuthGuard, AuthGuardAdmin], component: LocationEditComponent},
      {path: "location/:id", canActivate: [AuthGuard, AuthGuardAdmin], component: LocationDetailComponent},
      {
        path: "location/:id/edit",
        canActivate: [AuthGuard, AuthGuardAdmin],
        component: LocationEditComponent,
        children: [
          {
            path: "opening-hour",
            canActivate: [AuthGuard, AuthGuardAdmin],
            component: OpeningHourOverviewComponent,
            outlet: "opening-hour"
          },
          {
            path: "opening-hour/create",
            canActivate: [AuthGuard, AuthGuardAdmin],
            component: OpeningHourEditComponent,
            outlet: "opening-hour"
          },
          {
            path: "opening-hour/:id",
            canActivate: [AuthGuard, AuthGuardAdmin],
            component: OpeningHourDetailsComponent,
            outlet: "opening-hour"
          },
          {
            path: "opening-hour/:id/edit",
            canActivate: [AuthGuard, AuthGuardAdmin],
            component: OpeningHourEditComponent,
            outlet: "opening-hour"
          },
          {
            path: "opening-hour/:id/delete",
            canActivate: [AuthGuard, AuthGuardAdmin],
            component: OpeningHourDeleteComponent,
            outlet: "opening-hour"
          },
        ]
      },
      {
        path: "location/:id/delete",
        canActivate: [AuthGuard, AuthGuardAdmin],
        component: LocationDeleteComponent
      },
      {path: "", redirectTo: "address", pathMatch: "full"},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRouteModule {
}
