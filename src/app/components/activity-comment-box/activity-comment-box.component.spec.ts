import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityCommentBoxComponent } from './activity-comment-box.component';

describe('ActivityCommentBoxComponent', () => {
  let component: ActivityCommentBoxComponent;
  let fixture: ComponentFixture<ActivityCommentBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityCommentBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityCommentBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
