import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityListEmailComponent } from './activity-list-email.component';

describe('ActivityListEmailComponent', () => {
  let component: ActivityListEmailComponent;
  let fixture: ComponentFixture<ActivityListEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityListEmailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityListEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
