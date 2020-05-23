import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportListAccountComponent } from './report-list-account.component';

describe('ReportListAccountComponent', () => {
  let component: ReportListAccountComponent;
  let fixture: ComponentFixture<ReportListAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportListAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportListAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
