import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FruitDeleteComponent } from './fruit-delete.component';

describe('FruitDeleteComponent', () => {
  let component: FruitDeleteComponent;
  let fixture: ComponentFixture<FruitDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FruitDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FruitDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
