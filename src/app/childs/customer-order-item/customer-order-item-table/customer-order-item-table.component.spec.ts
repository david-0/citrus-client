import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerOrderItemTableComponent } from './customer-order-item-table.component';

describe('CustomerOrderItemTableComponent', () => {
  let component: CustomerOrderItemTableComponent;
  let fixture: ComponentFixture<CustomerOrderItemTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerOrderItemTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerOrderItemTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
