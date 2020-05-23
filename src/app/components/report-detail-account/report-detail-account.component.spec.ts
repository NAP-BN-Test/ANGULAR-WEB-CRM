import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportDetailAccountComponent } from './report-detail-account.component';

describe('ReportDetailAccountComponent', () => {
  let component: ReportDetailAccountComponent;
  let fixture: ComponentFixture<ReportDetailAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportDetailAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportDetailAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
