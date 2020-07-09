import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryMailOutcomeComponent } from './category-mail-outcome.component';

describe('CategoryMailOutcomeComponent', () => {
  let component: CategoryMailOutcomeComponent;
  let fixture: ComponentFixture<CategoryMailOutcomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryMailOutcomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryMailOutcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
