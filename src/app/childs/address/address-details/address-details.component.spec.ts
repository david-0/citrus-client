import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressDetailsComponentComponent } from './address-details.component';

describe('AddressDetailsComponentComponent', () => {
  let component: AddressDetailsComponentComponent;
  let fixture: ComponentFixture<AddressDetailsComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddressDetailsComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressDetailsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
