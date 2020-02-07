import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityListCallComponent } from './activity-list-call.component';

describe('ActivityListCallComponent', () => {
  let component: ActivityListCallComponent;
  let fixture: ComponentFixture<ActivityListCallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityListCallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityListCallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
