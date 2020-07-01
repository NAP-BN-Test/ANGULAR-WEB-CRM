import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportListMaillistDetailComponent } from './report-list-maillist-detail.component';

describe('ReportListMaillistDetailComponent', () => {
  let component: ReportListMaillistDetailComponent;
  let fixture: ComponentFixture<ReportListMaillistDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportListMaillistDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportListMaillistDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
