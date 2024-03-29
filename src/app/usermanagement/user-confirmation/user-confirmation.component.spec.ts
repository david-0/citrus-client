import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UserConfirmationComponent } from './user-confirmation.component';

describe('UserConfirmationComponent', () => {
  let component: UserConfirmationComponent;
  let fixture: ComponentFixture<UserConfirmationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UserConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
