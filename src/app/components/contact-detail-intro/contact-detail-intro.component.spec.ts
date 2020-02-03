import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactDetailIntroComponent } from './contact-detail-intro.component';

describe('ContactDetailIntroComponent', () => {
  let component: ContactDetailIntroComponent;
  let fixture: ComponentFixture<ContactDetailIntroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactDetailIntroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactDetailIntroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
