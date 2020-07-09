import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCategoryCallOutcomeComponent } from './add-category-call-outcome.component';

describe('AddCategoryCallOutcomeComponent', () => {
  let component: AddCategoryCallOutcomeComponent;
  let fixture: ComponentFixture<AddCategoryCallOutcomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCategoryCallOutcomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCategoryCallOutcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
