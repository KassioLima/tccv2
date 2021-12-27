import { TestBed } from '@angular/core/testing';

import { SchedulingTypeService } from './scheduling-type.service';

describe('SchedulingService', () => {
  let service: SchedulingTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SchedulingTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
