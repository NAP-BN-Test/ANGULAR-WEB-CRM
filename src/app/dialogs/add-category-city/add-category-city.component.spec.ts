import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCategoryCityComponent } from './add-category-city.component';

describe('AddCategoryCityComponent', () => {
  let component: AddCategoryCityComponent;
  let fixture: ComponentFixture<AddCategoryCityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCategoryCityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCategoryCityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
