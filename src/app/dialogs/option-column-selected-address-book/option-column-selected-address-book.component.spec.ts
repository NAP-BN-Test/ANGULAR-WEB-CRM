import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionColumnSelectedAddressBookComponent } from './option-column-selected-address-book.component';

describe('OptionColumnSelectedAddressBookComponent', () => {
  let component: OptionColumnSelectedAddressBookComponent;
  let fixture: ComponentFixture<OptionColumnSelectedAddressBookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptionColumnSelectedAddressBookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionColumnSelectedAddressBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
