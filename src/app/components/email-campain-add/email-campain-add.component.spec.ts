import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailCampainAddComponent } from './email-campain-add.component';

describe('EmailCampainAddComponent', () => {
  let component: EmailCampainAddComponent;
  let fixture: ComponentFixture<EmailCampainAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailCampainAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailCampainAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
