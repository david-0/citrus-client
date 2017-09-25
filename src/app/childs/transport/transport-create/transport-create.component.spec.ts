import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportCreateComponent } from './transport-create.component';

describe('TransportCreateComponent', () => {
  let component: TransportCreateComponent;
  let fixture: ComponentFixture<TransportCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransportCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransportCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
