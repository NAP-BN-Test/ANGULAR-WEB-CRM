import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryCallOutcomeComponent } from './category-call-outcome.component';

describe('CategoryCallOutcomeComponent', () => {
  let component: CategoryCallOutcomeComponent;
  let fixture: ComponentFixture<CategoryCallOutcomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryCallOutcomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryCallOutcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
