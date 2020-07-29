import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupFollowMailmergeCampaignComponent } from './setup-follow-mailmerge-campaign.component';

describe('SetupFollowMailmergeCampaignComponent', () => {
  let component: SetupFollowMailmergeCampaignComponent;
  let fixture: ComponentFixture<SetupFollowMailmergeCampaignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetupFollowMailmergeCampaignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupFollowMailmergeCampaignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
