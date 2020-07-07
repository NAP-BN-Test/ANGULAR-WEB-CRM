import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCategoryCountryComponent } from './add-category-country.component';

describe('AddCategoryCountryComponent', () => {
  let component: AddCategoryCountryComponent;
  let fixture: ComponentFixture<AddCategoryCountryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCategoryCountryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCategoryCountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
