import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryUserComponent } from './category-user.component';

describe('CategoryUserComponent', () => {
  let component: CategoryUserComponent;
  let fixture: ComponentFixture<CategoryUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
