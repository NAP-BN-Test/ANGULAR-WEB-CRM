import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMailmergeTemplateComponent } from './add-mailmerge-template.component';

describe('AddMailmergeTemplateComponent', () => {
  let component: AddMailmergeTemplateComponent;
  let fixture: ComponentFixture<AddMailmergeTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMailmergeTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMailmergeTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
