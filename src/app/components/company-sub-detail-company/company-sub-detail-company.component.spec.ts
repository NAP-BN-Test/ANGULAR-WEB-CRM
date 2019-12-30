import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanySubDetailCompanyComponent } from './company-sub-detail-company.component';

describe('CompanySubDetailCompanyComponent', () => {
  let component: CompanySubDetailCompanyComponent;
  let fixture: ComponentFixture<CompanySubDetailCompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanySubDetailCompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanySubDetailCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
