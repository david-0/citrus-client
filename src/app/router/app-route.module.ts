import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from '../dashboard/dashboard.component';
import {TransportationOverviewComponent} from '../childs/transport/transport-overview/transportation-overview.component';
import {AdministrationComponent} from '../childs/administration/administration.component';
import {BuyComponent} from '../childs/buy/buy.component';
import {FetchComponent} from '../childs/fetch/fetch.component';
import {CreateTransportComponent} from '../childs/transport/transport-create/create-transport.component';
import {TransportDetailsComponent} from '../childs/transport/transport-details/transport-details.component';
import {StorageOverviewComponent} from '../childs/storage/storage-overview/storage-overview.component';
import {UsersOverviewComponent} from '../childs/user/user-overview/users-overview.component';
import {FruitsOverviewComponent} from '../childs/fruit/fruit-overview/fruits-overview.component';
import {FruitCreateComponent} from '../childs/fruit/fruit-create/fruit-create.component';

const routes: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'transport', component: TransportationOverviewComponent},
  {path: 'storage-overview', component: StorageOverviewComponent},
  {path: 'create-transport', component: CreateTransportComponent},
  {
    path: 'administration', component: AdministrationComponent, children: [
    {path: 'transport', component: TransportationOverviewComponent},
    {path: 'transport/create', component: CreateTransportComponent},
    {path: 'transport/details', component: TransportDetailsComponent},
    {path: 'storage-overview', component: StorageOverviewComponent},
    {path: 'users-overview', component: UsersOverviewComponent},
    {path: 'fruit', component: FruitsOverviewComponent},
    {path: 'fruit/create', component: FruitCreateComponent},
    {path: '', redirectTo: 'transportation-overview', pathMatch: 'full'},
  ]
  },
  {path: 'buy', component: BuyComponent},
  {path: 'fetch', component: FetchComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRouteModule {
}
