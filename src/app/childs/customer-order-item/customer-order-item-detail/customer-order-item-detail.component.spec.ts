import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerOrderItemDetailComponent } from './customer-order-item-detail.component';

describe('CustomerOrderItemDetailComponent', () => {
  let component: CustomerOrderItemDetailComponent;
  let fixture: ComponentFixture<CustomerOrderItemDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerOrderItemDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerOrderItemDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
