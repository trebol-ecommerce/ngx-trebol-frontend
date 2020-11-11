// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { TestBed } from '@angular/core/testing';
import { LocalMemorySessionApiModule } from 'src/app/api/session/local-memory/local-memory-session-api.module';
import { LocalMemoryDataModule } from 'src/app/api/data-mgt/local-memory/local-memory-data.module';
import { AppService } from './app.service';

describe('AppService', () => {
  let service: AppService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        LocalMemoryDataModule,
        LocalMemorySessionApiModule
      ]
    });
    service = TestBed.inject(AppService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
