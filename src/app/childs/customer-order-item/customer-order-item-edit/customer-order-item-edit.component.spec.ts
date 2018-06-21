import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerOrderItemEditComponent } from './customer-order-item-edit.component';

describe('CustomerOrderItemEditComponent', () => {
  let component: CustomerOrderItemEditComponent;
  let fixture: ComponentFixture<CustomerOrderItemEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerOrderItemEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerOrderItemEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
