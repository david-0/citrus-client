import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuardAdmin } from "../authentication/auth-guard-admin.service";
import { AuthGuard } from "../authentication/auth-guard.service";
import { ChangeMyPasswordComponent } from "../change-my-password/change-my-password.component";
import { CheckoutComponent } from "../checkout/checkout/checkout.component";
import { AdministrationComponent } from "../childs/administration/administration.component";
import { ArticleStockDeleteComponent } from "../childs/article-stock/article-stock-delete/article-stock-delete.component";
import { ArticleStockDetailComponent } from "../childs/article-stock/article-stock-detail/article-stock-detail.component";
import { ArticleStockEditComponent } from "../childs/article-stock/article-stock-edit/article-stock-edit.component";
import { ArticleStockOverviewComponent } from "../childs/article-stock/article-stock-overview/article-stock-overview.component";
import { ArticleDeleteComponent } from "../childs/article/article-delete/article-delete.component";
import { ArticleDetailsComponent } from "../childs/article/article-details/article-details.component";
import { ArticleEditComponent } from "../childs/article/article-edit/article-edit.component";
import { ArticleOverviewComponent } from "../childs/article/article-overview/article-overview.component";
import { LocationDeleteComponent } from "../childs/location/location-delete/location-delete.component";
import { LocationDetailComponent } from "../childs/location/location-detail/location-detail.component";
import { LocationEditComponent } from "../childs/location/location-edit/location-edit.component";
import { LocationOverviewComponent } from "../childs/location/location-overview/location-overview.component";
import { OpeningHourDeleteComponent } from "../childs/opening-hour/opening-hour-delete/opening-hour-delete.component";
import { OpeningHourDetailsComponent } from "../childs/opening-hour/opening-hour-details/opening-hour-details.component";
import { OpeningHourEditComponent } from "../childs/opening-hour/opening-hour-edit/opening-hour-edit.component";
import { OpeningHourOverviewComponent } from "../childs/opening-hour/opening-hour-overview/opening-hour-overview.component";
import { OrderArchiveDeleteComponent } from "../childs/order-archive/order-archive-delete/order-archive-delete.component";
import { OrderArchiveDetailComponent } from "../childs/order-archive/order-archive-detail/order-archive-detail.component";
import { OrderArchiveOverviewComponent } from "../childs/order-archive/order-archive-overview/order-archive-overview.component";
import { OrderArchivingDetailComponent } from "../childs/order-archiving/order-archiving-detail/order-archiving-detail.component";
import { OrderArchivingOverviewComponent } from "../childs/order-archiving/order-archiving-overview/order-archiving-overview.component";
import { OrderItemDetailComponent } from "../childs/order-item/order-item-detail/order-item-detail.component";
import { OrderItemEditComponent } from "../childs/order-item/order-item-edit/order-item-edit.component";
import { OrderItemOverviewComponent } from "../childs/order-item/order-item-overview/order-item-overview.component";
import { OrderDeleteComponent } from "../childs/order/order-delete/order-delete.component";
import { OrderDetailComponent } from "../childs/order/order-detail/order-detail.component";
import { OrderEditComponent } from "../childs/order/order-edit/order-edit.component";
import { OrderOverviewComponent } from "../childs/order/order-overview/order-overview.component";
import { RoleDeleteComponent } from "../childs/role/role-delete/role-delete.component";
import { RoleDetailComponent } from "../childs/role/role-detail/role-detail.component";
import { RoleEditComponent } from "../childs/role/role-edit/role-edit.component";
import { RoleOverviewComponent } from "../childs/role/role-overview/role-overview.component";
import { UnitOfMeasurementDeleteComponent } from "../childs/unit-of-measurement/unit-of-measurement-delete/unit-of-measurement-delete.component";
import { UnitOfMeasurementDetailsComponent } from "../childs/unit-of-measurement/unit-of-measurement-details/unit-of-measurement-details.component";
import { UnitOfMeasurementEditComponent } from "../childs/unit-of-measurement/unit-of-measurement-edit/unit-of-measurement-edit.component";
import { UnitOfMeasurementOverviewComponent } from "../childs/unit-of-measurement/unit-of-measurement-overview/unit-of-measurement-overview.component";
import { UserInfoDeleteComponent } from "../childs/user/user-delete/user-info-delete.component";
import { UserInfoDetailsComponent } from "../childs/user/user-details/user-details.component";
import { UserEditComponent } from "../childs/user/user-edit/user-edit.component";
import { UserOverviewComponent } from "../childs/user/user-overview/user-overview.component";
import { UserPasswordChangeComponent } from "../childs/user/user-password-change/user-password-change.component";
import { DashboardComponent } from "../dashboard/dashboard.component";
import { PublicArticleDetailComponent } from "../dashboard/public-article-detail/public-article-detail.component";
import { AboutUsComponent } from "../footer/about-us/about-us.component";
import { ContactComponent } from "../footer/contact/contact.component";
import { OrganisationComponent } from "../footer/organisation/organisation.component";
import { PrivacyPolicyComponent } from "../footer/privacy-policy/privacy-policy.component";
import { LoginComponent } from "../login/login.component";
import { LogoutComponent } from "../logout/logout.component";
import { SendEmailToAllComponent } from "../message/send-email-to-all/send-email-to-all.component";
import { RegisterComponent } from "../usermanagement/register/register.component";
import { ResetMailConfirmationComponent } from "../usermanagement/reset-mail-confirmation/reset-mail-confirmation.component";
import { ResetMailComponent } from "../usermanagement/reset-mail/reset-mail.component";
import { ResetPasswortWithTokenComponent } from "../usermanagement/reset-password-with-token/reset-passwort-with-token.component";
import { UserConfirmationComponent } from "../usermanagement/user-confirmation/user-confirmation.component";
import { DeliveryNoteOverviewComponent } from "../childs/delivery-note/delivery-note-overview/delivery-note-overview.component";
import { DeliveryNoteDetailComponent } from "../childs/delivery-note/delivery-note-detail/delivery-note-detail.component";
import { LocationOpeningHoursComponent } from "../footer/location-opening-hours/location-opening-hours.component";
import { MessageTemplateEditComponent } from "../childs/message-template/message-template-edit/message-template-edit.component";
import { MessageTemplateDeleteComponent } from "../childs/message-template/message-template-delete/message-template-delete.component";
import { MessageTemplateDetailsComponent } from "../childs/message-template/message-template-details/message-template-details.component";
import { MessageTemplateOverviewComponent } from "../childs/message-template/message-template-overview/message-template-overview.component";
import { OrderItemDeleteComponent } from "../childs/order-item/order-item-delete/order-item-delete.component";
import { MyOrdersComponent } from "../childs/user/my-orders/my-orders.component";

const routes: Routes = [
  { path: "", redirectTo: "organisation", pathMatch: "full" },
  { path: "dashboard", canActivate: [AuthGuard], component: DashboardComponent },
  { path: "dashboard/detail/:articleId/:locationId", canActivate: [AuthGuard], component: PublicArticleDetailComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "userConfirmation/:token", component: UserConfirmationComponent },
  { path: "resetMail", component: ResetMailComponent },
  { path: "resetMailConfirmation", component: ResetMailConfirmationComponent },
  { path: "resetPassword/:token", component: ResetPasswortWithTokenComponent },
  { path: "logout", component: LogoutComponent },
  { path: "aboutUs", component: AboutUsComponent },
  { path: "contact", component: ContactComponent },
  { path: "organisation", component: OrganisationComponent },
  { path: "privacyPolicy", component: PrivacyPolicyComponent },
  { path: "checkout/:id", canActivate: [AuthGuard], component: CheckoutComponent },
  { path: "myOrders", canActivate: [AuthGuard], component: MyOrdersComponent },
  { path: "changeMyPassword", canActivate: [AuthGuard], component: ChangeMyPasswordComponent },
  { path: "locations", canActivate: [AuthGuard], component: LocationOpeningHoursComponent },
  {
    path: "administration", canActivate: [AuthGuard, AuthGuardAdmin], component: AdministrationComponent, children: [
      { path: "user", canActivate: [AuthGuard, AuthGuardAdmin], component: UserOverviewComponent },
      { path: "user/create", canActivate: [AuthGuard, AuthGuardAdmin], component: UserEditComponent },
      { path: "user/:id", canActivate: [AuthGuard, AuthGuardAdmin], component: UserInfoDetailsComponent },
      { path: "user/:id/edit", canActivate: [AuthGuard, AuthGuardAdmin], component: UserEditComponent },
      { path: "user/:id/delete", canActivate: [AuthGuard, AuthGuardAdmin], component: UserInfoDeleteComponent },
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
      {
        path: "messageTemplate",
        canActivate: [AuthGuard, AuthGuardAdmin],
        component: MessageTemplateOverviewComponent
      },
      {
        path: "messageTemplate/create",
        canActivate: [AuthGuard, AuthGuardAdmin],
        component: MessageTemplateEditComponent
      },
      {
        path: "messageTemplate/:id",
        canActivate: [AuthGuard, AuthGuardAdmin],
        component: MessageTemplateDetailsComponent
      },
      {
        path: "messageTemplate/:id/edit",
        canActivate: [AuthGuard, AuthGuardAdmin],
        component: MessageTemplateEditComponent
      },
      {
        path: "messageTemplate/:id/delete",
        canActivate: [AuthGuard, AuthGuardAdmin],
        component: MessageTemplateDeleteComponent
      },
      { path: "role", canActivate: [AuthGuard, AuthGuardAdmin], component: RoleOverviewComponent },
      { path: "role/create", canActivate: [AuthGuard, AuthGuardAdmin], component: RoleEditComponent },
      { path: "role/:id", canActivate: [AuthGuard, AuthGuardAdmin], component: RoleDetailComponent },
      { path: "role/:id/edit", canActivate: [AuthGuard, AuthGuardAdmin], component: RoleEditComponent },
      { path: "role/:id/delete", canActivate: [AuthGuard, AuthGuardAdmin], component: RoleDeleteComponent },
      { path: "article", canActivate: [AuthGuard, AuthGuardAdmin], component: ArticleOverviewComponent },
      { path: "article/create", canActivate: [AuthGuard, AuthGuardAdmin], component: ArticleEditComponent },
      { path: "article/:id", canActivate: [AuthGuard, AuthGuardAdmin], component: ArticleDetailsComponent },
      { path: "article/:id/edit", canActivate: [AuthGuard, AuthGuardAdmin], component: ArticleEditComponent },
      { path: "article/:id/delete", canActivate: [AuthGuard, AuthGuardAdmin], component: ArticleDeleteComponent },

      { path: "articleStock", canActivate: [AuthGuard, AuthGuardAdmin], component: ArticleStockOverviewComponent },
      { path: "articleStock/create", canActivate: [AuthGuard, AuthGuardAdmin], component: ArticleStockEditComponent },
      { path: "articleStock/:id", canActivate: [AuthGuard, AuthGuardAdmin], component: ArticleStockDetailComponent },
      { path: "articleStock/:id/edit", canActivate: [AuthGuard, AuthGuardAdmin], component: ArticleStockEditComponent },
      {
        path: "articleStock/:id/delete",
        canActivate: [AuthGuard, AuthGuardAdmin],
        component: ArticleStockDeleteComponent
      },
      { path: "message", canActivate: [AuthGuard, AuthGuardAdmin], component: SendEmailToAllComponent },
      { path: "order", canActivate: [AuthGuard, AuthGuardAdmin], component: OrderOverviewComponent },
      { path: "order/create", canActivate: [AuthGuard, AuthGuardAdmin], component: OrderEditComponent },
      { path: "order/:id", canActivate: [AuthGuard, AuthGuardAdmin], component: OrderDetailComponent },
      {
        path: "order/:id/edit",
        canActivate: [AuthGuard, AuthGuardAdmin],
        component: OrderEditComponent,
        children: [
          {
            path: "orderItem",
            canActivate: [AuthGuard, AuthGuardAdmin],
            component: OrderItemOverviewComponent,
            outlet: "details"
          },
          {
            path: "orderItem/create",
            canActivate: [AuthGuard, AuthGuardAdmin],
            component: OrderItemEditComponent,
            outlet: "details"
          },
          {
            path: "orderItem/:id",
            canActivate: [AuthGuard, AuthGuardAdmin],
            component: OrderItemDetailComponent,
            outlet: "details"
          },
          {
            path: "orderItem/:id/edit",
            canActivate: [AuthGuard, AuthGuardAdmin],
            component: OrderItemEditComponent,
            outlet: "details"
          },
          {
            path: "orderItem/:id/delete",
            canActivate: [AuthGuard, AuthGuardAdmin],
            component: OrderItemDeleteComponent,
            outlet: "details"
          },
        ]
      },
      {
        path: "order/:id/delete",
        canActivate: [AuthGuard, AuthGuardAdmin],
        component: OrderDeleteComponent
      },

      { path: "deliveryNote", canActivate: [AuthGuard, AuthGuardAdmin], component: DeliveryNoteOverviewComponent },
      { path: "deliveryNote/:id", canActivate: [AuthGuard, AuthGuardAdmin], component: DeliveryNoteDetailComponent },

      { path: "orderArchive", canActivate: [AuthGuard, AuthGuardAdmin], component: OrderArchiveOverviewComponent },
      { path: "orderArchive/:id", canActivate: [AuthGuard, AuthGuardAdmin], component: OrderArchiveDetailComponent },
      { path: "orderArchive/:id/delete", canActivate: [AuthGuard, AuthGuardAdmin], component: OrderArchiveDeleteComponent },
      { path: "orderArchiving", canActivate: [AuthGuard, AuthGuardAdmin], component: OrderArchivingOverviewComponent },
      { path: "orderArchiving/:id", canActivate: [AuthGuard, AuthGuardAdmin], component: OrderArchivingDetailComponent },
      { path: "location", canActivate: [AuthGuard, AuthGuardAdmin], component: LocationOverviewComponent },
      { path: "location/create", canActivate: [AuthGuard, AuthGuardAdmin], component: LocationEditComponent },
      { path: "location/:id", canActivate: [AuthGuard, AuthGuardAdmin], component: LocationDetailComponent },
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
      { path: "", redirectTo: "articleStock", pathMatch: "full" },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }),
  ],
  exports: [RouterModule]
})
export class AppRouteModule {
}
