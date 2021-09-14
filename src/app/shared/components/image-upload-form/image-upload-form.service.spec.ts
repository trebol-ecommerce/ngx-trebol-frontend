// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { TestBed } from '@angular/core/testing';
import { LocalMemoryApiModule } from 'src/app/api/local-memory/local-memory-api.module';
import { ImageManagerUploadService } from './image-upload-form.service';

describe('ImageManagerUploadService', () => {
  let service: ImageManagerUploadService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ LocalMemoryApiModule ],
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
