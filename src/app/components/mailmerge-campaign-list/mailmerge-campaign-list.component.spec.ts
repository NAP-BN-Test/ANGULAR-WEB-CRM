import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MailmergeCampaignListComponent } from './mailmerge-campaign-list.component';

describe('MailmergeCampaignListComponent', () => {
  let component: MailmergeCampaignListComponent;
  let fixture: ComponentFixture<MailmergeCampaignListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MailmergeCampaignListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MailmergeCampaignListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
