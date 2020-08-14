import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEmailErrorComponent } from './dialog-email-error.component';

describe('DialogEmailErrorComponent', () => {
  let component: DialogEmailErrorComponent;
  let fixture: ComponentFixture<DialogEmailErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogEmailErrorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEmailErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
