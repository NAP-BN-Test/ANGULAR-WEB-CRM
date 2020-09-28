import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewSalesSellingQuotationComponent } from './add-new-sales-selling-quotation.component';

describe('AddNewSalesSellingQuotationComponent', () => {
  let component: AddNewSalesSellingQuotationComponent;
  let fixture: ComponentFixture<AddNewSalesSellingQuotationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewSalesSellingQuotationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewSalesSellingQuotationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
