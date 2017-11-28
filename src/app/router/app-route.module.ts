import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {AddressDeleteComponent} from "../childs/address/address-delete/address-delete.component";
import {AddressDetailsComponent} from "../childs/address/address-details/address-details.component";
import {AddressEditComponent} from "../childs/address/address-edit/address-edit.component";
import {AddressOverviewComponent} from "../childs/address/address-overview/address-overview.component";
import {AdministrationComponent} from "../childs/administration/administration.component";
import {DashboardComponent} from "../dashboard/dashboard.component";

const routes: Routes = [
  {path: "", redirectTo: "dashboard", pathMatch: "full"},
  {path: "dashboard", component: DashboardComponent},
  {
    path: "administration", component: AdministrationComponent, children: [
    {path: "address", component: AddressOverviewComponent},
    {path: "address/create", component: AddressEditComponent},
    {path: "address/:id", component: AddressDetailsComponent},
    {path: "address/:id/edit", component: AddressEditComponent},
    {path: "address/:id/delete", component: AddressDeleteComponent},
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
