import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {UserInfoDeleteComponent} from "./user-info-delete.component";

describe("UserInfoDeleteComponent", () => {
  let component: UserInfoDeleteComponent;
  let fixture: ComponentFixture<UserInfoDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserInfoDeleteComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserInfoDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
