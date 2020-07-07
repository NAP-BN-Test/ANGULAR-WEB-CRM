import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryStepComponent } from './category-step.component';

describe('CategoryStepComponent', () => {
  let component: CategoryStepComponent;
  let fixture: ComponentFixture<CategoryStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryStepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
