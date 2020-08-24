import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateContactToAddressBookComponent } from './add-update-contact-to-address-book.component';

describe('AddUpdateContactToAddressBookComponent', () => {
  let component: AddUpdateContactToAddressBookComponent;
  let fixture: ComponentFixture<AddUpdateContactToAddressBookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUpdateContactToAddressBookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUpdateContactToAddressBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
