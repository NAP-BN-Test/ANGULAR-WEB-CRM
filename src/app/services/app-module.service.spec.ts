import { TestBed } from '@angular/core/testing';

import { AppModuleService } from './app-module.service';

describe('AppModuleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AppModuleService = TestBed.get(AppModuleService);
    expect(service).toBeTruthy();
  });
});
