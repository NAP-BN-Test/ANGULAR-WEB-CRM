import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableSalesSellingQuotationComponent } from './table-sales-selling-quotation.component';

describe('TableSalesSellingQuotationComponent', () => {
  let component: TableSalesSellingQuotationComponent;
  let fixture: ComponentFixture<TableSalesSellingQuotationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableSalesSellingQuotationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableSalesSellingQuotationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
