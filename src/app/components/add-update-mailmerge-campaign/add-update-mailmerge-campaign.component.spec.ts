import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateMailmergeCampaignComponent } from './add-update-mailmerge-campaign.component';

describe('AddUpdateMailmergeCampaignComponent', () => {
  let component: AddUpdateMailmergeCampaignComponent;
  let fixture: ComponentFixture<AddUpdateMailmergeCampaignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUpdateMailmergeCampaignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUpdateMailmergeCampaignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
