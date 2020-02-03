import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactDetailActivityComponent } from './contact-detail-activity.component';

describe('ContactDetailActivityComponent', () => {
  let component: ContactDetailActivityComponent;
  let fixture: ComponentFixture<ContactDetailActivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactDetailActivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactDetailActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
