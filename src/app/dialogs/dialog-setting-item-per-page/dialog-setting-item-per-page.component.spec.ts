import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSettingItemPerPageComponent } from './dialog-setting-item-per-page.component';

describe('DialogSettingItemPerPageComponent', () => {
  let component: DialogSettingItemPerPageComponent;
  let fixture: ComponentFixture<DialogSettingItemPerPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogSettingItemPerPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogSettingItemPerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
