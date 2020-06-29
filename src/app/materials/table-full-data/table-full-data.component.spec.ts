import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableFullDataComponent } from './table-full-data.component';

describe('TableFullDataComponent', () => {
  let component: TableFullDataComponent;
  let fixture: ComponentFixture<TableFullDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableFullDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableFullDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
