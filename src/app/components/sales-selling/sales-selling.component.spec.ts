import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesSellingComponent } from './sales-selling.component';

describe('SalesSellingComponent', () => {
  let component: SalesSellingComponent;
  let fixture: ComponentFixture<SalesSellingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesSellingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesSellingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
