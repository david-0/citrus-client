import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgessSpinnerComponent } from './progess-spinner.component';

describe('ProgessSpinnerComponent', () => {
  let component: ProgessSpinnerComponent;
  let fixture: ComponentFixture<ProgessSpinnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgessSpinnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgessSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
