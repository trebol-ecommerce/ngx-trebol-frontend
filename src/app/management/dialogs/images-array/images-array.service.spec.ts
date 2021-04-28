// Copyright (c) 2021 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { TestBed } from '@angular/core/testing';
import { LocalMemoryDataModule } from 'src/app/api/data/local-memory/local-memory-data-api.module';
import { ImagesArrayService } from './images-array.service';

describe('ImagesArrayService', () => {
  let service: ImagesArrayService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ LocalMemoryDataModule ],
      providers: [
        ImagesArrayService
      ]
    });
    service = TestBed.inject(ImagesArrayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
