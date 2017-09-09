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
import 'hammerjs';

import {AppComponent} from './app.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AppRouteModule} from './router/app-route.module';
import {AdministrationComponent} from './childs/administration/administration.component';
import {BuyComponent} from './childs/buy/buy.component';
import {FetchComponent} from './childs/fetch/fetch.component';
import {CreateTransportComponent} from './childs/transportation/create-transport/create-transport.component';
import {ChangeTransportComponent} from './childs/transportation/change-transport/change-transport.component';
import {DeleteTransportComponent} from './childs/transportation/delete-transport/delete-transport.component';
import {TransportationOverviewComponent} from './childs/transportation/transportation-overview/transportation-overview.component';
import {StorageOverviewComponent} from './childs/storage/storage-overview/storage-overview.component';
import {FruitsOverviewComponent} from './childs/fruits/fruits-overview/fruits-overview.component';
import {UsersOverviewComponent} from './childs/users/users-overview/users-overview.component';

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
  ],
  providers: [MdIconRegistry],
  bootstrap: [AppComponent]
})
export class AppModule {
}
