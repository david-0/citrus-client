import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {AddressDeleteComponent} from "../childs/address/address-delete/address-delete.component";
import {AddressDetailsComponent} from "../childs/address/address-details/address-details.component";
import {AddressEditComponent} from "../childs/address/address-edit/address-edit.component";
import {AddressOverviewComponent} from "../childs/address/address-overview/address-overview.component";
import {AdministrationComponent} from "../childs/administration/administration.component";
import {TransportDeleteComponent} from "../childs/transport/transport-delete/transport-delete.component";
import {DashboardComponent} from "../dashboard/dashboard.component";

const routes: Routes = [
  {path: "", redirectTo: "dashboard", pathMatch: "full"},
  {path: "dashboard", component: DashboardComponent},
  {
    path: "administration", component: AdministrationComponent, children: [
    {path: "transport/:id/delete", component: TransportDeleteComponent},
    {path: "address", component: AddressOverviewComponent},
    {path: "address/create", component: AddressEditComponent},
    {path: "address/:id", component: AddressDetailsComponent},
    {path: "address/:id/edit", component: AddressEditComponent},
    {path: "address/:id/delete", component: AddressDeleteComponent},
    {path: "", redirectTo: "transportation-overview", pathMatch: "full"},
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
