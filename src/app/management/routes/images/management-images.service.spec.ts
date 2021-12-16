/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { TestBed } from '@angular/core/testing';
import { LocalMemoryApiModule } from 'src/app/api/local-memory/local-memory-api.module';
import { ManagementImagesService } from './management-images.service';

describe('ManagementImagesService', () => {
  let service: ManagementImagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ LocalMemoryApiModule ],
      providers: [
        ManagementImagesService
      ]
    });
    service = TestBed.inject(ManagementImagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
