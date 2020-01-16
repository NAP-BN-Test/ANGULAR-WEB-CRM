import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownAttendCreateComponent } from './dropdown-attend-create.component';

describe('DropdownAttendCreateComponent', () => {
  let component: DropdownAttendCreateComponent;
  let fixture: ComponentFixture<DropdownAttendCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DropdownAttendCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownAttendCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
