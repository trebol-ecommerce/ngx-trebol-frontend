/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { TestBed } from '@angular/core/testing';
import { PageEvent } from '@angular/material/paginator';
import { concat, EMPTY, of } from 'rxjs';
import { finalize, take, tap } from 'rxjs/operators';
import { DataPage } from 'src/models/DataPage';
import { Product } from 'src/models/entities/Product';
import { API_INJECTION_TOKENS } from '../api/api-injection-tokens';
import { IEntityDataApiService } from '../api/entity.data-api.iservice';
import { ITransactionalEntityDataApiService } from '../api/transactional-entity.data-api.iservice';
import { StoreSearchService } from './store-search.service';

describe('StoreSearchService', () => {
  let service: StoreSearchService;
  let productDataApiServiceSpy: jasmine.SpyObj<IEntityDataApiService<Product>>;

  beforeEach(() => {
    const mockProductDataApiService = jasmine.createSpyObj('ITransactionalEntityDataApiService<Product>', ['fetchPage']);

    TestBed.configureTestingModule({
      providers: [
        { provide: API_INJECTION_TOKENS.dataProducts, useValue: mockProductDataApiService }
      ]
    });
  });

  beforeEach(() => {
    productDataApiServiceSpy = TestBed.inject(API_INJECTION_TOKENS.dataProducts) as jasmine.SpyObj<ITransactionalEntityDataApiService<Product>>;
    productDataApiServiceSpy.fetchPage.and.returnValue(EMPTY);
    service = TestBed.inject(StoreSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should reload data ', () => {
    const mockPage: DataPage<Product> = {
      items: [],
      pageIndex: 0,
      pageSize: 10,
      totalCount: 0
    };
    productDataApiServiceSpy.fetchPage.and.returnValue(of(mockPage));

    concat(
      service.reload(),
      service.currentPage$.pipe(
        take(1),
        tap(p => expect(p).toEqual(mockPage))
      )
    ).pipe(
      finalize(() => expect(productDataApiServiceSpy.fetchPage).toHaveBeenCalled())
    ).subscribe();
  });

  it('should reload data after a pagination call', () => {
    const ev: PageEvent = { pageIndex: 0, pageSize: 5, length: 10 };
    service.paginate(ev).pipe(
      finalize(() => expect(productDataApiServiceSpy.fetchPage).toHaveBeenCalled())
    ).subscribe();
  });

  it('should update search params', () => {
    expect(() => service.updateSearchQuery(null)).not.toThrowError();
    expect(() => service.updateSearchQuery({
      nameLike: 'some-name'
    })).not.toThrowError();
    expect(() => service.updateSearchQuery({
      categoryCode: 'some-code'
    })).not.toThrowError();
    expect(() => service.updateSearchQuery({
      nameLike: 'some-name',
      categoryCode: 'some-code'
    })).not.toThrowError();
  });

});
