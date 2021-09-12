// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SessionLocalMemoryApiService } from 'src/app/api/local-memory/session/session.local-memory-api.service';
import { ManagementService } from './management.service';
import { API_SERVICE_INJECTION_TOKENS } from '../api/api-service-injection-tokens';

describe('ManagementService', () => {
  let service: ManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      providers: [
        ManagementService,
        { provide: API_SERVICE_INJECTION_TOKENS.auth, useClass: SessionLocalMemoryApiService }
      ]
    });
    service = TestBed.inject(ManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
