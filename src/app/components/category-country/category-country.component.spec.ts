import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryCountryComponent } from './category-country.component';

describe('CategoryCountryComponent', () => {
  let component: CategoryCountryComponent;
  let fixture: ComponentFixture<CategoryCountryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryCountryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryCountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
