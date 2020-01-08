import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatetimePickDateComponent } from './datetime-pick-date.component';

describe('DatetimePickDateComponent', () => {
  let component: DatetimePickDateComponent;
  let fixture: ComponentFixture<DatetimePickDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatetimePickDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatetimePickDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
