import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddItemsToMailmergeCampaignComponent } from './add-items-to-mailmerge-campaign.component';

describe('AddItemsToMailmergeCampaignComponent', () => {
  let component: AddItemsToMailmergeCampaignComponent;
  let fixture: ComponentFixture<AddItemsToMailmergeCampaignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddItemsToMailmergeCampaignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddItemsToMailmergeCampaignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
