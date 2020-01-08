import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatetimePickTimeComponent } from './datetime-pick-time.component';

describe('DatetimePickTimeComponent', () => {
  let component: DatetimePickTimeComponent;
  let fixture: ComponentFixture<DatetimePickTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatetimePickTimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatetimePickTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
