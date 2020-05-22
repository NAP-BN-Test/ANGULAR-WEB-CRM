import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailCampainComponent } from './email-campain.component';

describe('EmailCampainComponent', () => {
  let component: EmailCampainComponent;
  let fixture: ComponentFixture<EmailCampainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailCampainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailCampainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
