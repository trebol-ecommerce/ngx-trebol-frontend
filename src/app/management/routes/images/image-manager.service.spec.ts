// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { TestBed } from '@angular/core/testing';

import { ImageManagerService } from './image-manager.service';

describe('ImageManagerService', () => {
  let service: ImageManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImageManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
