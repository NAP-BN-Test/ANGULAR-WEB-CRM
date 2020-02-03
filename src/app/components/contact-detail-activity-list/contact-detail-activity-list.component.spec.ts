import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactDetailActivityListComponent } from './contact-detail-activity-list.component';

describe('ContactDetailActivityListComponent', () => {
  let component: ContactDetailActivityListComponent;
  let fixture: ComponentFixture<ContactDetailActivityListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactDetailActivityListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactDetailActivityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
