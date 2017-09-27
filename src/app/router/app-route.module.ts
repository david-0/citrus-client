import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from '../dashboard/dashboard.component';
import {TransportOverviewComponent} from '../childs/transport/transport-overview/transport-overview.component';
import {AdministrationComponent} from '../childs/administration/administration.component';
import {BuyComponent} from '../childs/buy/buy.component';
import {FetchComponent} from '../childs/fetch/fetch.component';
import {TransportCreateComponent} from '../childs/transport/transport-create/transport-create.component';
import {TransportDetailsComponent} from '../childs/transport/transport-details/transport-details.component';
import {StorageOverviewComponent} from '../childs/storage/storage-overview/storage-overview.component';
import {UsersOverviewComponent} from '../childs/user/user-overview/users-overview.component';
import {FruitsOverviewComponent} from '../childs/fruit/fruit-overview/fruits-overview.component';
import {FruitCreateComponent} from '../childs/fruit/fruit-create/fruit-create.component';
import {TransportEditComponent} from '../childs/transport/transport-edit/transport-edit.component';
import {TransportDeleteComponent} from '../childs/transport/transport-delete/transport-delete.component';

const routes: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'transport', component: TransportOverviewComponent},
  {path: 'storage-overview', component: StorageOverviewComponent},
  {path: 'create-transport', component: TransportCreateComponent},
  {
    path: 'administration', component: AdministrationComponent, children: [
    {path: 'transport', component: TransportOverviewComponent},
    {path: 'transport/create', component: TransportCreateComponent},
    {path: 'transport/:id', component: TransportDetailsComponent},
    {path: 'transport/:id/edit', component: TransportEditComponent},
    {path: 'transport/:id/deleted', component: TransportDeleteComponent},
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
