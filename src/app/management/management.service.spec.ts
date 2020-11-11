// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LocalMemorySessionApiModule } from 'src/app/api/session/local-memory/local-memory-session-api.module';
import { LocalMemoryDataModule } from 'src/app/api/data-mgt/local-memory/local-memory-data.module';
import { ManagementService } from './management.service';

describe('ManagementService', () => {
  let service: ManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        LocalMemoryDataModule,
        LocalMemorySessionApiModule
      ],
      providers: [
        ManagementService
      ]
    });
    service = TestBed.inject(ManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
