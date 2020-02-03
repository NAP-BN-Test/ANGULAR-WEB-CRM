import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactDetailOtherComponent } from './contact-detail-other.component';

describe('ContactDetailOtherComponent', () => {
  let component: ContactDetailOtherComponent;
  let fixture: ComponentFixture<ContactDetailOtherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactDetailOtherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactDetailOtherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
