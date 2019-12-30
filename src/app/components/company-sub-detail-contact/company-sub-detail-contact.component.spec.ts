import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanySubDetailContactComponent } from './company-sub-detail-contact.component';

describe('CompanySubDetailContactComponent', () => {
  let component: CompanySubDetailContactComponent;
  let fixture: ComponentFixture<CompanySubDetailContactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanySubDetailContactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanySubDetailContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
