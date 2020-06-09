import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailListSubReportComponent } from './email-list-sub-report.component';

describe('EmailListSubReportComponent', () => {
  let component: EmailListSubReportComponent;
  let fixture: ComponentFixture<EmailListSubReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailListSubReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailListSubReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
