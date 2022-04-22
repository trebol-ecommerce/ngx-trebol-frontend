/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { TestBed } from '@angular/core/testing';
import { merge, of } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { API_INJECTION_TOKENS } from 'src/app/api/api-injection-tokens';
import { IEntityDataApiService } from 'src/app/api/entity.data-api.iservice';
import { DataPage } from 'src/models/DataPage';
import { Image } from 'src/models/entities/Image';
import { ImagesArrayDialogService } from './images-array-dialog.service';

describe('ImagesArrayDialogService', () => {
  let service: ImagesArrayDialogService;
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
        ImagesArrayDialogService,
        { provide: API_INJECTION_TOKENS.dataImages, useValue: null }
      ]
    });
  });

  it('should be created', () => {
    service = TestBed.inject(ImagesArrayDialogService);
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
      API_INJECTION_TOKENS.dataImages,
      { useValue: mockApiService }
    );
    service = TestBed.inject(ImagesArrayDialogService);

    merge(
      service.reloadItems(),
      service.page$.pipe(
        take(1),
        tap(nextPage => expect(nextPage).toEqual(mockDataPage))
      )
    ).subscribe();
  });
});
