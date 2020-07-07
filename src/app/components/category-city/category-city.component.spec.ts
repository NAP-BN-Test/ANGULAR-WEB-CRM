import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryCityComponent } from './category-city.component';

describe('CategoryCityComponent', () => {
  let component: CategoryCityComponent;
  let fixture: ComponentFixture<CategoryCityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryCityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryCityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
