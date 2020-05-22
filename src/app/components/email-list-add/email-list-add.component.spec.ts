import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailListAddComponent } from './email-list-add.component';

describe('EmailListAddComponent', () => {
  let component: EmailListAddComponent;
  let fixture: ComponentFixture<EmailListAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailListAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailListAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
