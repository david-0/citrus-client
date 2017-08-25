import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MdToolbarModule } from '@angular/material';
import 'hammerjs';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppRouteModule } from './router/app-route.module';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRouteModule,
    MdToolbarModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
