import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCompanyTransportComponent } from './list-company-transport.component';

describe('ListCompanyTransportComponent', () => {
  let component: ListCompanyTransportComponent;
  let fixture: ComponentFixture<ListCompanyTransportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCompanyTransportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCompanyTransportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
