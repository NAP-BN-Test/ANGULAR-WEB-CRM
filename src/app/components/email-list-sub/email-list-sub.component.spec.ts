import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailListSubComponent } from './email-list-sub.component';

describe('EmailListSubComponent', () => {
  let component: EmailListSubComponent;
  let fixture: ComponentFixture<EmailListSubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailListSubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailListSubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
