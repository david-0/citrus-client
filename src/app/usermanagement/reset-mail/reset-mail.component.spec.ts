import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import {ResetMailComponent} from "./reset-mail.component";

describe("ResetMailComponent", () => {
  let component: ResetMailComponent;
  let fixture: ComponentFixture<ResetMailComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ResetMailComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
