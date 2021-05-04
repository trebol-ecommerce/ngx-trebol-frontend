// Copyright (c) 2021 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { TestBed } from '@angular/core/testing';
import { LocalMemoryDataModule } from 'src/app/api/data/local-memory/local-memory-data-api.module';
import { ImagesArrayService } from './images-array.service';
import { ImagesService } from 'src/app/shared/services/images.service';
import { of } from 'rxjs';
import { take } from 'rxjs/operators';
import { Image } from 'src/app/models/entities/Image';

describe('ImagesArrayService', () => {
  let service: ImagesArrayService;
  let mockImagesService: Partial<ImagesService>;

  beforeEach(() => {
    mockImagesService = {
      images$: of([])
    };

    TestBed.configureTestingModule({
      imports: [],
      providers: [
        ImagesArrayService,
        { provide: ImagesService, useValue: mockImagesService }
      ]
    });
  });

  it('should be created', () => {
    service = TestBed.inject(ImagesArrayService);
    expect(service).toBeTruthy();
  });

  it('should expose an observable of images', () => {
    const mockImagesArray: Image[] = [
      {
        filename: 'test.png',
        url: 'test/test.png',
        id: 'test/test.png'
      }
    ];
    const mockService = { images$: of(mockImagesArray) };
    TestBed.overrideProvider(ImagesService, { useValue: mockService });
    service = TestBed.inject(ImagesArrayService);

    service.imageList$.pipe(
      take(1)
    ).subscribe(images => {
      expect(images).toEqual(mockImagesArray);
    });
  });

  it('should expose an observable of image options for a mat-list', () => {
    const mockImage: Image = {
      filename: 'test.png',
      url: 'test/test.png',
      id: 'test/test.png'
    };
    const mockService = { images$: of([mockImage]) };
    TestBed.overrideProvider(ImagesService, { useValue: mockService });
    service = TestBed.inject(ImagesArrayService);
    service.triggerOptionsFetch();

    service.imageOptions$.pipe(
      take(1)
    ).subscribe(options => {
      expect(options).toEqual([
        { image: mockImage, selected: false, disabled: false }
      ]);
    });
  });
});
