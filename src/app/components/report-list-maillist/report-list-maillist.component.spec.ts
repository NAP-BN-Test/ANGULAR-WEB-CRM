import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportListMaillistComponent } from './report-list-maillist.component';

describe('ReportListMaillistComponent', () => {
  let component: ReportListMaillistComponent;
  let fixture: ComponentFixture<ReportListMaillistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportListMaillistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportListMaillistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
