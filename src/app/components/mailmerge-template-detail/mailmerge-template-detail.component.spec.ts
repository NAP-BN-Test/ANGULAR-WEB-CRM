import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MailmergeTemplateDetailComponent } from './mailmerge-template-detail.component';

describe('MailmergeTemplateDetailComponent', () => {
  let component: MailmergeTemplateDetailComponent;
  let fixture: ComponentFixture<MailmergeTemplateDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MailmergeTemplateDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MailmergeTemplateDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
