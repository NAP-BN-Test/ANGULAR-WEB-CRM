import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityListTaskComponent } from './activity-list-task.component';

describe('ActivityListTaskComponent', () => {
  let component: ActivityListTaskComponent;
  let fixture: ComponentFixture<ActivityListTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityListTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityListTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
