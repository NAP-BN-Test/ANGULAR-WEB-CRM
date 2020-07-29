import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MailmergeTemplateListComponent } from './mailmerge-template-list.component';

describe('MailmergeTemplateListComponent', () => {
  let component: MailmergeTemplateListComponent;
  let fixture: ComponentFixture<MailmergeTemplateListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MailmergeTemplateListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MailmergeTemplateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
