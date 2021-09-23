/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { TestBed } from '@angular/core/testing';
import { LocalMemoryApiModule } from 'src/app/api/local-memory/local-memory-api.module';
import { ImageManagerService } from './image-manager.service';

describe('ImageManagerService', () => {
  let service: ImageManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ LocalMemoryApiModule ],
      providers: [
        ImageManagerService
      ]
    });
    service = TestBed.inject(ImageManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
