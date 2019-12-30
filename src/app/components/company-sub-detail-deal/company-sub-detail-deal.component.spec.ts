import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanySubDetailDealComponent } from './company-sub-detail-deal.component';

describe('CompanySubDetailDealComponent', () => {
  let component: CompanySubDetailDealComponent;
  let fixture: ComponentFixture<CompanySubDetailDealComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanySubDetailDealComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanySubDetailDealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
