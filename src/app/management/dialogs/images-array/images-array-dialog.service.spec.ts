/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { TestBed } from '@angular/core/testing';
import { concat, of } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { API_INJECTION_TOKENS } from 'src/app/api/api-injection-tokens';
import { IEntityDataApiService } from 'src/app/api/entity.data-api.iservice';
import { ITransactionalEntityDataApiService } from 'src/app/api/transactional-entity.data-api.iservice';
import { Image } from 'src/models/entities/Image';
import { ImagesArrayDialogService } from './images-array-dialog.service';

describe('ImagesArrayDialogService', () => {
  let service: ImagesArrayDialogService;
  let apiServiceSpy: jasmine.SpyObj<IEntityDataApiService<Image>>;

  beforeEach(() => {
    const mockApiService = jasmine.createSpyObj('IEntityDataApiService<Image>', ['fetchPage']);

    TestBed.configureTestingModule({
      providers: [
        ImagesArrayDialogService,
        { provide: API_INJECTION_TOKENS.dataImages, useValue: mockApiService }
      ]
    });
    apiServiceSpy = TestBed.inject(API_INJECTION_TOKENS.dataImages) as jasmine.SpyObj<ITransactionalEntityDataApiService<Image>>;
    service = TestBed.inject(ImagesArrayDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should expose an observable of images', () => {
    const mockPage = {
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
    apiServiceSpy.fetchPage.and.returnValue(of(mockPage));

    concat(
      service.reloadItems(),
      service.page$.pipe(
        take(1),
        tap(nextPage => expect(nextPage).toEqual(mockPage))
      )
    ).subscribe();
  });
});
