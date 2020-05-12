import { TestBed } from '@angular/core/testing';

import { VsCodeService } from './vs-code-service';

describe('VsCodeService', () => {
  let service: VsCodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VsCodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
