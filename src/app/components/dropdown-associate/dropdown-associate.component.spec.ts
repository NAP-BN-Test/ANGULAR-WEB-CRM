import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownAssociateComponent } from './dropdown-associate.component';

describe('DropdownAssociateComponent', () => {
  let component: DropdownAssociateComponent;
  let fixture: ComponentFixture<DropdownAssociateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DropdownAssociateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownAssociateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
