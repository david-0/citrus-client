import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {UserInfoOverviewComponent} from "./user-info-overview.component";

describe("UserInfoOverviewComponent", () => {
  let component: UserInfoOverviewComponent;
  let fixture: ComponentFixture<UserInfoOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserInfoOverviewComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserInfoOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
