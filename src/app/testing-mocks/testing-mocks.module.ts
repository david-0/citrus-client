import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {MockOutputMessageComponent, MockTableHeaderComponent} from "./testing-mocks.component";

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    MockTableHeaderComponent,
    MockOutputMessageComponent,
  ],
  exports: [
    MockTableHeaderComponent,
    MockOutputMessageComponent,
  ]
})
export class TestingMocksModule {
}
