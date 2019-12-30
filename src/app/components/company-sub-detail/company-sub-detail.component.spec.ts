import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanySubDetailComponent } from './company-sub-detail.component';

describe('CompanySubDetailComponent', () => {
  let component: CompanySubDetailComponent;
  let fixture: ComponentFixture<CompanySubDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanySubDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanySubDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
