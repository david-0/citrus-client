import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportDeletedComponent } from './transport-deleted.component';

describe('TransportDeletedComponent', () => {
  let component: TransportDeletedComponent;
  let fixture: ComponentFixture<TransportDeletedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransportDeletedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransportDeletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
