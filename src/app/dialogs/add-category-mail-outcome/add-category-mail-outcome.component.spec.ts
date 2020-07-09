import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCategoryMailOutcomeComponent } from './add-category-mail-outcome.component';

describe('AddCategoryMailOutcomeComponent', () => {
  let component: AddCategoryMailOutcomeComponent;
  let fixture: ComponentFixture<AddCategoryMailOutcomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCategoryMailOutcomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCategoryMailOutcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
