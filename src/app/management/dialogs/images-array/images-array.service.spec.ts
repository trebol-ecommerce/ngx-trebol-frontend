/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { API_SERVICE_INJECTION_TOKENS } from 'src/app/api/api-service-injection-tokens';
import { IEntityDataApiService } from 'src/app/api/entity.data-api.iservice';
import { DataPage } from 'src/models/DataPage';
import { Image } from 'src/models/entities/Image';
import { ImagesArrayService } from './images-array.service';

describe('ImagesArrayService', () => {
  let service: ImagesArrayService;
  let mockApiService: Partial<IEntityDataApiService<Image>>;

  beforeEach(() => {
    mockApiService = {
      fetchPage() {
        return of({
          items: [ ],
          pageIndex: 0,
          pageSize: 10,
          totalCount: 0
        });
      }
    };

    TestBed.configureTestingModule({
      imports: [],
      providers: [
        ImagesArrayService,
        { provide: API_SERVICE_INJECTION_TOKENS.dataImages, useValue: null }
      ]
    });
  });

  it('should be created', () => {
    service = TestBed.inject(ImagesArrayService);
    expect(service).toBeTruthy();
  });

  it('should expose an observable of images', () => {
    const mockDataPage: DataPage<Image> = {
      items: [
        {
          filename: 'test.png',
          url: 'test/test.png'
        }
      ],
      pageIndex: 0,
      pageSize: 10,
      totalCount: 1
    };
    mockApiService.fetchPage = () => of(mockDataPage);
    TestBed.overrideProvider(
      API_SERVICE_INJECTION_TOKENS.dataImages,
      { useValue: mockApiService }
    );
    service = TestBed.inject(ImagesArrayService);

    service.reloadItems();
    service.imagesPage$.pipe(
      take(1),
      tap(nextPage => expect(nextPage).toEqual(mockDataPage))
    ).subscribe();
  });
});
