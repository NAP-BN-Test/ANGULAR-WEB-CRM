import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryJobTileComponent } from './category-job-tile.component';

describe('CategoryJobTileComponent', () => {
  let component: CategoryJobTileComponent;
  let fixture: ComponentFixture<CategoryJobTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryJobTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryJobTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
