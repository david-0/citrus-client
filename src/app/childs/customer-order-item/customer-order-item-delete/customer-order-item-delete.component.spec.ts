import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerOrderItemDeleteComponent } from './customer-order-item-delete.component';

describe('CustomerOrderItemDeleteComponent', () => {
  let component: CustomerOrderItemDeleteComponent;
  let fixture: ComponentFixture<CustomerOrderItemDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerOrderItemDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerOrderItemDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
