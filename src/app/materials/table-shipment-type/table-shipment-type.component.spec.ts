import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableShipmentTypeComponent } from './table-shipment-type.component';

describe('TableShipmentTypeComponent', () => {
  let component: TableShipmentTypeComponent;
  let fixture: ComponentFixture<TableShipmentTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableShipmentTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableShipmentTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
