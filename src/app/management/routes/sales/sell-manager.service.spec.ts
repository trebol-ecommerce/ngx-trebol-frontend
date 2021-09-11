// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { TestBed } from '@angular/core/testing';
import { LocalMemoryDataModule } from 'src/app/api/local-memory/local-memory-data-api.module';
import { SellManagerService } from './sell-manager.service';

describe('SellManagerService', () => {
  let service: SellManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ LocalMemoryDataModule ],
      providers: [
        SellManagerService
      ]
    });
    service = TestBed.inject(SellManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
