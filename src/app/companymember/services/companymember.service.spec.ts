import { TestBed } from '@angular/core/testing';

import { CompanymemberService } from './companymember.service';

describe('CompanymemberService', () => {
  let service: CompanymemberService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompanymemberService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
