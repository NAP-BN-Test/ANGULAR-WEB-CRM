import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAssignContactComponent } from './dialog-assign-contact.component';

describe('DialogAssignContactComponent', () => {
  let component: DialogAssignContactComponent;
  let fixture: ComponentFixture<DialogAssignContactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogAssignContactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAssignContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
