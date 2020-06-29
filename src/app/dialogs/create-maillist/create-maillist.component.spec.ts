import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMaillistComponent } from './create-maillist.component';

describe('CreateMaillistComponent', () => {
  let component: CreateMaillistComponent;
  let fixture: ComponentFixture<CreateMaillistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateMaillistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMaillistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
