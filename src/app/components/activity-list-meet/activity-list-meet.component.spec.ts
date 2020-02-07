import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityListMeetComponent } from './activity-list-meet.component';

describe('ActivityListMeetComponent', () => {
  let component: ActivityListMeetComponent;
  let fixture: ComponentFixture<ActivityListMeetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityListMeetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityListMeetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
