/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { TestBed } from '@angular/core/testing';
import { EMPTY } from 'rxjs';
import { API_SERVICE_INJECTION_TOKENS } from 'src/app/api/api-service-injection-tokens';
import { ITransactionalEntityDataApiService } from 'src/app/api/transactional-entity.data-api.iservice';
import { Image } from 'src/models/entities/Image';
import { ImageManagerUploadService } from './image-upload-form.service';

describe('ImageManagerUploadService', () => {
  let service: ImageManagerUploadService;
  let mockApiService: Partial<ITransactionalEntityDataApiService<Image>>;

  beforeEach(() => {
    mockApiService = {
      create() { return EMPTY; },
      update() { return EMPTY; }
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: API_SERVICE_INJECTION_TOKENS.dataImages, useValue: mockApiService }
      ]
    });
    service = TestBed.inject(ImageManagerUploadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
