import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableAddressBookComponent } from './table-address-book.component';

describe('TableAddressBookComponent', () => {
  let component: TableAddressBookComponent;
  let fixture: ComponentFixture<TableAddressBookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableAddressBookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableAddressBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
