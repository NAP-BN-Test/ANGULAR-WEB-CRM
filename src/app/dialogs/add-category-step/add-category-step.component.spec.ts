import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCategoryStepComponent } from './add-category-step.component';

describe('AddCategoryStepComponent', () => {
  let component: AddCategoryStepComponent;
  let fixture: ComponentFixture<AddCategoryStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCategoryStepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCategoryStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
