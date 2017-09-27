import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportDeleteComponent } from './transport-delete.component';

describe('TransportDeleteComponent', () => {
  let component: TransportDeleteComponent;
  let fixture: ComponentFixture<TransportDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransportDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransportDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
