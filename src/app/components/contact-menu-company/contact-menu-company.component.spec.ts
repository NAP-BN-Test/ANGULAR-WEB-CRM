import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactMenuCompanyComponent } from './contact-menu-company.component';

describe('ContactMenuCompanyComponent', () => {
  let component: ContactMenuCompanyComponent;
  let fixture: ComponentFixture<ContactMenuCompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactMenuCompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactMenuCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
