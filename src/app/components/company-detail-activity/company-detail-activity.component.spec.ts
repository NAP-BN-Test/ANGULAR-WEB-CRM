import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyDetailActivityComponent } from './company-detail-activity.component';

describe('CompanyDetailActivityComponent', () => {
  let component: CompanyDetailActivityComponent;
  let fixture: ComponentFixture<CompanyDetailActivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyDetailActivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyDetailActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
