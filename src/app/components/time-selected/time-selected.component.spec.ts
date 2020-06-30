import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeSelectedComponent } from './time-selected.component';

describe('TimeSelectedComponent', () => {
  let component: TimeSelectedComponent;
  let fixture: ComponentFixture<TimeSelectedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeSelectedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeSelectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
