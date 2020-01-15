import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownAssociateCreateComponent } from './dropdown-associate-create.component';

describe('DropdownAssociateCreateComponent', () => {
  let component: DropdownAssociateCreateComponent;
  let fixture: ComponentFixture<DropdownAssociateCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DropdownAssociateCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownAssociateCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
