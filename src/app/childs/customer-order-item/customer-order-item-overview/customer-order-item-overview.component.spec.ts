import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerOrderItemOverviewComponent } from './customer-order-item-overview.component';

describe('CustomerOrderItemOverviewComponent', () => {
  let component: CustomerOrderItemOverviewComponent;
  let fixture: ComponentFixture<CustomerOrderItemOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerOrderItemOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerOrderItemOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
