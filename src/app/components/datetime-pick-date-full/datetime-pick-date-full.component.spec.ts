import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatetimePickDateFullComponent } from './datetime-pick-date-full.component';

describe('DatetimePickDateFullComponent', () => {
  let component: DatetimePickDateFullComponent;
  let fixture: ComponentFixture<DatetimePickDateFullComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatetimePickDateFullComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatetimePickDateFullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
