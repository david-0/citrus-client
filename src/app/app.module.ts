import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {MdIconRegistry, MdToolbarModule} from '@angular/material';
import {MdCardModule} from '@angular/material';
import {MdButtonModule} from '@angular/material';
import {MdSelectModule} from '@angular/material';
import {MdSidenavModule} from '@angular/material';
import {MdButtonToggleModule} from '@angular/material';
import {MdIconModule} from '@angular/material';
import {MdDatepickerModule} from '@angular/material';
import {MdNativeDateModule} from '@angular/material';
import {MdInputModule} from '@angular/material';
import {MdFormFieldModule} from '@angular/material';
import {MdTooltipModule} from '@angular/material';
import 'hammerjs';

import {AppComponent} from './app.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AppRouteModule} from './router/app-route.module';
import {AdministrationComponent} from './childs/administration/administration.component';
import {BuyComponent} from './childs/buy/buy.component';
import {FetchComponent} from './childs/fetch/fetch.component';
import {CreateTransportComponent} from './childs/transport/transport-create/create-transport.component';
import {ChangeTransportComponent} from './childs/transport/transport-change/change-transport.component';
import {DeleteTransportComponent} from './childs/transport/transport-delete/delete-transport.component';
import {TransportationOverviewComponent} from './childs/transport/transport-overview/transportation-overview.component';
import {StorageOverviewComponent} from './childs/storage/storage-overview/storage-overview.component';
import {FruitsOverviewComponent} from './childs/fruit/fruit-overview/fruits-overview.component';
import {UsersOverviewComponent} from './childs/user/user-overview/users-overview.component';
import {FruitCreateComponent} from './childs/fruit/fruit-create/fruit-create.component';
import {ListSupportModule} from './list-support/list-support.module';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AdministrationComponent,
    FetchComponent,
    BuyComponent,
    TransportationOverviewComponent,
    CreateTransportComponent,
    ChangeTransportComponent,
    DeleteTransportComponent,
    StorageOverviewComponent,
    FruitsOverviewComponent,
    UsersOverviewComponent,
    FruitCreateComponent,
  ],
  imports: [
    BrowserModule,
    AppRouteModule,
    MdToolbarModule,
    BrowserAnimationsModule,
    MdCardModule,
    MdButtonModule,
    MdSelectModule,
    MdSidenavModule,
    MdButtonToggleModule,
    MdIconModule,
    MdDatepickerModule,
    MdNativeDateModule,
    MdInputModule,
    MdFormFieldModule,
    ListSupportModule,
    MdTooltipModule,
  ],
  providers: [MdIconRegistry],
  bootstrap: [AppComponent]
})
export class AppModule {
}
