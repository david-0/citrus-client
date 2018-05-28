import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {AuthGuardAdmin} from "../authentication/auth-guard-admin.service";
import {AuthGuard} from "../authentication/auth-guard.service";
import {ChangeMyPasswordComponent} from "../change-my-password/change-my-password.component";
import {AddressDeleteComponent} from "../childs/address/address-delete/address-delete.component";
import {AddressDetailsComponent} from "../childs/address/address-details/address-details.component";
import {AddressEditComponent} from "../childs/address/address-edit/address-edit.component";
import {AddressOverviewComponent} from "../childs/address/address-overview/address-overview.component";
import {AdministrationComponent} from "../childs/administration/administration.component";
import {ArticleDeleteComponent} from "../childs/article/article-delete/article-delete.component";
import {ArticleDetailsComponent} from "../childs/article/article-details/article-details.component";
import {ArticleEditComponent} from "../childs/article/article-edit/article-edit.component";
import {ArticleOverviewComponent} from "../childs/article/article-overview/article-overview.component";
import {UnitOfMeasurementDeleteComponent} from "../childs/unit-of-measurement/unit-of-measurement-delete/unit-of-measurement-delete.component";
import {UnitOfMeasurementDetailsComponent} from "../childs/unit-of-measurement/unit-of-measurement-details/unit-of-measurement-details.component";
import {UnitOfMeasurementEditComponent} from "../childs/unit-of-measurement/unit-of-measurement-edit/unit-of-measurement-edit.component";
import {UnitOfMeasurementOverviewComponent} from "../childs/unit-of-measurement/unit-of-measurement-overview/unit-of-measurement-overview.component";
import {UserInfoDeleteComponent} from "../childs/user/user-info-delete/user-info-delete.component";
import {UserInfoDetailsComponent} from "../childs/user/user-info-details/user-info-details.component";
import {UserInfoEditComponent} from "../childs/user/user-info-edit/user-info-edit.component";
import {UserInfoOverviewComponent} from "../childs/user/user-info-overview/user-info-overview.component";
import {UserInfoPasswordChangeComponent} from "../childs/user/user-info-password-change/user-info-password-change.component";
import {DashboardComponent} from "../dashboard/dashboard.component";
import {LoginComponent} from "../login/login.component";
import {LogoutComponent} from "../logout/logout.component";

const routes: Routes = [
  {path: "", redirectTo: "dashboard", pathMatch: "full"},
  {path: "dashboard", component: DashboardComponent},
  {path: "login", component: LoginComponent},
  {path: "logout", component: LogoutComponent},
  {path: "changeMyPassword", component: ChangeMyPasswordComponent},
  {
    path: "administration", canActivate: [AuthGuard], component: AdministrationComponent, children: [
      {path: "address", component: AddressOverviewComponent},
      {path: "address/create", component: AddressEditComponent},
      {path: "address/:id", component: AddressDetailsComponent},
      {path: "address/:id/edit", component: AddressEditComponent},
      {path: "address/:id/delete", component: AddressDeleteComponent},
      {path: "user", component: UserInfoOverviewComponent},
      {path: "user/create", component: UserInfoEditComponent},
      {path: "user/:id", component: UserInfoDetailsComponent},
      {path: "user/:id/edit", component: UserInfoEditComponent},
      {path: "user/:id/delete", component: UserInfoDeleteComponent},
      {path: "user/:id/passwordChange", canActivate: [AuthGuardAdmin], component: UserInfoPasswordChangeComponent},
      {path: "unitOfMeasurement", component: UnitOfMeasurementOverviewComponent},
      {path: "unitOfMeasurement/create", component: UnitOfMeasurementEditComponent},
      {path: "unitOfMeasurement/:id", component: UnitOfMeasurementDetailsComponent},
      {path: "unitOfMeasurement/:id/edit", component: UnitOfMeasurementEditComponent},
      {path: "unitOfMeasurement/:id/delete", component: UnitOfMeasurementDeleteComponent},
      {path: "article", component: ArticleOverviewComponent},
      {path: "article/create", component: ArticleEditComponent},
      {path: "article/:id", component: ArticleDetailsComponent},
      {path: "article/:id/edit", component: ArticleEditComponent},
      {path: "article/:id/delete", component: ArticleDeleteComponent},
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
