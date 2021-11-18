import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import {MySpinnerComponent} from "./my-spinner.component";

describe("MySpinnerComponent", () => {
  let component: MySpinnerComponent;
  let fixture: ComponentFixture<MySpinnerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [MySpinnerComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MySpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
