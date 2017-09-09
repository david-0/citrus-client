import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from '../dashboard/dashboard.component';
import {TransportationOverviewComponent} from '../childs/transport/transport-overview/transportation-overview.component';
import {AdministrationComponent} from '../childs/administration/administration.component';
import {BuyComponent} from '../childs/buy/buy.component';
import {FetchComponent} from '../childs/fetch/fetch.component';
import {CreateTransportComponent} from '../childs/transport/create-transport/create-transport.component';
import {StorageOverviewComponent} from '../childs/storage/storage-overview/storage-overview.component';
import {UsersOverviewComponent} from '../childs/users/users-overview/users-overview.component';
import {FruitsOverviewComponent} from '../childs/fruits/fruits-overview/fruits-overview.component';

const routes: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'transportation-overview', component: TransportationOverviewComponent},
  {path: 'storage-overview', component: StorageOverviewComponent},
  {path: 'create-transport', component: CreateTransportComponent},
  {
    path: 'administration', component: AdministrationComponent, children: [
    {
      path: 'transportation-overview', component: TransportationOverviewComponent, children: [
      {path: 'create-transport', component: CreateTransportComponent},
    ]
    },
    {path: 'create-transport', component: CreateTransportComponent},
    {path: 'storage-overview', component: StorageOverviewComponent},
    {path: 'users-overview', component: UsersOverviewComponent},
    {path: 'fruits-overview', component: FruitsOverviewComponent},
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
