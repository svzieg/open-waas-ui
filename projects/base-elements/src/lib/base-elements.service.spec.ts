import { TestBed } from '@angular/core/testing';

import { BaseElementsService } from './base-elements.service';

describe('BaseElementsService', () => {
  let service: BaseElementsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BaseElementsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
