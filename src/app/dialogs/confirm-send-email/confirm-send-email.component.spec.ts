import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmSendEmailComponent } from './confirm-send-email.component';

describe('ConfirmSendEmailComponent', () => {
  let component: ConfirmSendEmailComponent;
  let fixture: ComponentFixture<ConfirmSendEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmSendEmailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmSendEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
