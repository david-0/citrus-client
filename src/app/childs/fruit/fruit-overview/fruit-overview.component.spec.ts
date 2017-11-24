import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {FruitOverviewComponent} from "./fruit-overview.component";

describe("FruitOverviewComponent", () => {
  let component: FruitOverviewComponent;
  let fixture: ComponentFixture<FruitOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FruitOverviewComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FruitOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should be created", () => {
    expect(component).toBeTruthy();
  });
});
