import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuillBoxComponent } from './quill-box.component';

describe('QuillBoxComponent', () => {
  let component: QuillBoxComponent;
  let fixture: ComponentFixture<QuillBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuillBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuillBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
