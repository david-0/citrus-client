import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {AdministrationComponent} from "../childs/administration/administration.component";
import {BuyComponent} from "../childs/buy/buy.component";
import {FetchComponent} from "../childs/fetch/fetch.component";
import {FruitDeleteComponent} from "../childs/fruit/fruit-delete/fruit-delete.component";
import {FruitDetailsComponent} from "../childs/fruit/fruit-details/fruit-details.component";
import {FruitEditComponent} from "../childs/fruit/fruit-edit/fruit-edit.component";
import {FruitOverviewComponent} from "../childs/fruit/fruit-overview/fruit-overview.component";
import {StorageOverviewComponent} from "../childs/storage/storage-overview/storage-overview.component";
import {TransportDeleteComponent} from "../childs/transport/transport-delete/transport-delete.component";
import {TransportDetailsComponent} from "../childs/transport/transport-details/transport-details.component";
import {TransportEditComponent} from "../childs/transport/transport-edit/transport-edit.component";
import {TransportOverviewComponent} from "../childs/transport/transport-overview/transport-overview.component";
import {UsersOverviewComponent} from "../childs/user/user-overview/users-overview.component";
import {DashboardComponent} from "../dashboard/dashboard.component";
import {AddressOverviewComponent} from "../childs/address/address-overview/address-overview.component";
import {AddressEditComponent} from "../childs/address/address-edit/address-edit.component";

const routes: Routes = [
  {path: "", redirectTo: "dashboard", pathMatch: "full"},
  {path: "dashboard", component: DashboardComponent},
  {path: "transport", component: TransportOverviewComponent},
  {path: "storage-overview", component: StorageOverviewComponent},
  {path: "create-transport", component: TransportEditComponent},
  {
    path: "administration", component: AdministrationComponent, children: [
    {path: "transport", component: TransportOverviewComponent},
    {path: "transport/create", component: TransportEditComponent},
    {path: "transport/:id", component: TransportDetailsComponent},
    {path: "transport/:id/edit", component: TransportEditComponent},
    {path: "transport/:id/delete", component: TransportDeleteComponent},
    {path: "storage-overview", component: StorageOverviewComponent},
    {path: "users-overview", component: UsersOverviewComponent},
    {path: "address", component: AddressOverviewComponent},
    {path: "address/create", component: AddressEditComponent},
    {path: "address/:id/edit", component: AddressEditComponent},
    {path: "fruit", component: FruitOverviewComponent},
    {path: "fruit/create", component: FruitEditComponent},
    {path: "fruit/:id", component: FruitDetailsComponent},
    {path: "fruit/:id/edit", component: FruitEditComponent},
    {path: "fruit/:id/delete", component: FruitDeleteComponent},
    {path: "", redirectTo: "transportation-overview", pathMatch: "full"},
  ]
  },
  {path: "buy", component: BuyComponent},
  {path: "fetch", component: FetchComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRouteModule {
}
