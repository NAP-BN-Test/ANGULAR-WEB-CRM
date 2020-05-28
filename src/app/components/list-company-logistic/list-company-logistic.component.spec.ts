import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCompanyLogisticComponent } from './list-company-logistic.component';

describe('ListCompanyLogisticComponent', () => {
  let component: ListCompanyLogisticComponent;
  let fixture: ComponentFixture<ListCompanyLogisticComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCompanyLogisticComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCompanyLogisticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
