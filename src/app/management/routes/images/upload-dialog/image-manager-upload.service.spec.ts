// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { TestBed } from '@angular/core/testing';
import { LocalMemoryDataModule } from 'src/app/api/local-memory/local-memory-data-api.module';
import { ImageManagerUploadService } from './image-manager-upload.service';

describe('ImageManagerUploadService', () => {
  let service: ImageManagerUploadService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ LocalMemoryDataModule ],
      providers: [
        ImageManagerUploadService
      ]
    });
    service = TestBed.inject(ImageManagerUploadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
