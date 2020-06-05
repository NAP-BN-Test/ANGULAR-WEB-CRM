import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailCampainDetailComponent } from './email-campain-detail.component';

describe('EmailCampainDetailComponent', () => {
  let component: EmailCampainDetailComponent;
  let fixture: ComponentFixture<EmailCampainDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailCampainDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailCampainDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
