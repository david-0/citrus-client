import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FruitCreateComponent } from './fruit-create.component';

describe('FruitCreateComponent', () => {
  let component: FruitCreateComponent;
  let fixture: ComponentFixture<FruitCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FruitCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FruitCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
