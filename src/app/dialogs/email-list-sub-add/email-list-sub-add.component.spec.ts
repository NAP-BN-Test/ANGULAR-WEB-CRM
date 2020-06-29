import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailListSubAddComponent } from './email-list-sub-add.component';

describe('EmailListSubAddComponent', () => {
  let component: EmailListSubAddComponent;
  let fixture: ComponentFixture<EmailListSubAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailListSubAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailListSubAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
