import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCategoryJobTileComponent } from './add-category-job-tile.component';

describe('AddCategoryJobTileComponent', () => {
  let component: AddCategoryJobTileComponent;
  let fixture: ComponentFixture<AddCategoryJobTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCategoryJobTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCategoryJobTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
