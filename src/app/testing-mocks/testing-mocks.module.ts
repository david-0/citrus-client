import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {MockListHeaderComponent, MockTableHeaderComponent} from "./testing-mocks.component";

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    MockTableHeaderComponent,
  ],
  exports: [
    MockTableHeaderComponent,
  ]
})
export class TestingMocksModule {
}
