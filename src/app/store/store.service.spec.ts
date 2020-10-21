// Copyright (c) 2020 Benjamin La Madrid
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { LocalMemoryDataModule } from 'src/app/data/local-memory/local-memory-data.module';
import { StoreService } from './store.service';

describe('StoreService', () => {
  let service: StoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        LocalMemoryDataModule,
        HttpClientTestingModule
      ],
      providers: [
        StoreService
      ]
    });
    service = TestBed.inject(StoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
