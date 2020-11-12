// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { LocalMemoryStoreApiModule } from 'src/app/api/store/local-memory/local-memory-store-api.module';
import { StoreCatalogService } from './store-catalog.service';

describe('StoreCatalogService', () => {
  let service: StoreCatalogService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        RouterTestingModule,
        LocalMemoryStoreApiModule
      ],
      providers: [
        StoreCatalogService
      ]
    });
    service = TestBed.inject(StoreCatalogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
