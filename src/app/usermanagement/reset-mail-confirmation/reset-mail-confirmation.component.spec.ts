import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import {ResetMailConfirmationComponent} from "./reset-mail-confirmation.component";

describe("ResetMailConfirmationComponent", () => {
  let component: ResetMailConfirmationComponent;
  let fixture: ComponentFixture<ResetMailConfirmationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ResetMailConfirmationComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetMailConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
