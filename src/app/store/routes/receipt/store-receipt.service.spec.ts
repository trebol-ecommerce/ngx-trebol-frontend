// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { TestBed } from '@angular/core/testing';
import { LocalMemoryDataModule } from 'src/app/api/local-memory/local-memory-data-api.module';
import { StoreReceiptService } from './store-receipt.service';
import { RouterTestingModule } from '@angular/router/testing';
import { LocalMemoryStoreApiModule } from 'src/app/api/local-memory/local-memory-store-api.module';

describe('StoreReceiptService', () => {
  let service: StoreReceiptService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        LocalMemoryDataModule,
        LocalMemoryStoreApiModule
      ],
      providers: [
        StoreReceiptService
      ]
    });
    service = TestBed.inject(StoreReceiptService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
