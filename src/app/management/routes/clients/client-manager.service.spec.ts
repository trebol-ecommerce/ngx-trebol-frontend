import { TestBed } from '@angular/core/testing';

import { ClientManagerService } from './client-manager.service';

describe('ClientManagerService', () => {
  let service: ClientManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
