import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityListNoteComponent } from './activity-list-note.component';

describe('ActivityListNoteComponent', () => {
  let component: ActivityListNoteComponent;
  let fixture: ComponentFixture<ActivityListNoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityListNoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityListNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
