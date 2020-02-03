import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAssignCompanyComponent } from './dialog-assign-company.component';

describe('DialogAssignCompanyComponent', () => {
  let component: DialogAssignCompanyComponent;
  let fixture: ComponentFixture<DialogAssignCompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogAssignCompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAssignCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
