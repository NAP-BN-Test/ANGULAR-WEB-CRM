import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddMailListComponent } from './dialog-add-mail-list.component';

describe('DialogAddMailListComponent', () => {
  let component: DialogAddMailListComponent;
  let fixture: ComponentFixture<DialogAddMailListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogAddMailListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddMailListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
