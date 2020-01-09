import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactMenuContactComponent } from './contact-menu-contact.component';

describe('ContactMenuContactComponent', () => {
  let component: ContactMenuContactComponent;
  let fixture: ComponentFixture<ContactMenuContactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactMenuContactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactMenuContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
