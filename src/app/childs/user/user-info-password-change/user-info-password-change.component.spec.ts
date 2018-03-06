import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInfoPasswordChangeComponent } from './user-info-password-change.component';

describe('UserInfoPasswordChangeComponent', () => {
  let component: UserInfoPasswordChangeComponent;
  let fixture: ComponentFixture<UserInfoPasswordChangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserInfoPasswordChangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserInfoPasswordChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
