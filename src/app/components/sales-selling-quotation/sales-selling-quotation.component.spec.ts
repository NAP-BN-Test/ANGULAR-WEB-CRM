import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesSellingQuotationComponent } from './sales-selling-quotation.component';

describe('SalesSellingQuotationComponent', () => {
  let component: SalesSellingQuotationComponent;
  let fixture: ComponentFixture<SalesSellingQuotationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesSellingQuotationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesSellingQuotationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
