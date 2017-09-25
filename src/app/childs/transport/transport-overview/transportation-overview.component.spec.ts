import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportOverviewComponent } from './transport-overview.component';

describe('TransportOverviewComponent', () => {
  let component: TransportOverviewComponent;
  let fixture: ComponentFixture<TransportOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransportOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransportOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
