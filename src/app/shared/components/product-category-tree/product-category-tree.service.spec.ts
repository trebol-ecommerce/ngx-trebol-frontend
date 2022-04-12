/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { TestBed } from '@angular/core/testing';
import { EMPTY, merge, of } from 'rxjs';
import { finalize, skip, take, tap } from 'rxjs/operators';
import { API_INJECTION_TOKENS } from 'src/app/api/api-injection-tokens';
import { ProductCategoriesDataLocalMemoryApiService } from 'src/app/api/local-memory/data/product-categories-data.local-memory-api.service';
import { MOCK_PRODUCT_CATEGORIES } from 'src/app/api/local-memory/mock/mock-product-categories.datasource';
import { ITransactionalEntityDataApiService } from 'src/app/api/transactional-entity.data-api.iservice';
import { ProductCategory } from 'src/models/entities/ProductCategory';
import { ProductCategoryTreeService } from './product-category-tree.service';

describe('ProductCategoryTreeService', () => {
  let service: ProductCategoryTreeService;

  beforeEach(() => {
    const mockApiService = jasmine.createSpyObj('ITransactionalEntityDataApiService<ProductCategory>', ['fetchPage']);

    TestBed.configureTestingModule({
      providers: [
        { provide: API_INJECTION_TOKENS.dataProductCategories, useValue: mockApiService },
      ]
    });
  });

  describe('always', () => {
    let apiServiceSpy: jasmine.SpyObj<ITransactionalEntityDataApiService<ProductCategory>>;

    beforeEach(() => {
      apiServiceSpy = TestBed.inject(API_INJECTION_TOKENS.dataProductCategories) as jasmine.SpyObj<ITransactionalEntityDataApiService<ProductCategory>>;
      service = TestBed.inject(ProductCategoryTreeService);
    });

    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('should fetch the root categories', () => {
      apiServiceSpy.fetchPage.and.returnValue(of({
        pageIndex: 0,
        items: [],
        totalCount: 0,
        pageSize: 10
      }));
      service.reloadCategories();
      expect(apiServiceSpy.fetchPage).toHaveBeenCalled();
    });
  });

  describe('using a local datastore', () => {
    let apiService: ITransactionalEntityDataApiService<ProductCategory>;

    beforeEach(() => {
      TestBed.overrideProvider(API_INJECTION_TOKENS.dataProductCategories,
        {
          useValue: new ProductCategoriesDataLocalMemoryApiService()
        }
      );
      apiService = TestBed.inject(API_INJECTION_TOKENS.dataProductCategories);
      service = TestBed.inject(ProductCategoryTreeService);
    });

    it('should fetch', () => {
      apiService.fetchPage().pipe(
        tap(p => {
          expect(p).toBeTruthy();
          expect(p.items).toBeTruthy();
          expect(Array.isArray(p.items)).toBeTrue();
          expect(p.items.length > 0).toBeTrue();
        })
      ).subscribe();
    });

    it('should fetch categories recursively and return a tree-like structure', () => {
      merge(
        service.categories$.pipe(
          skip(1),
          take(1)
        ),
        EMPTY.pipe(
          finalize(() => service.reloadCategories())
        )
      ).pipe(
        // as many roots as in the local memory array
        // TODO flatten result to compare branches as well
        tap(categories => expect(categories.length === MOCK_PRODUCT_CATEGORIES.filter(c => !c.parent).length).toBeTrue())
      ).subscribe();
    });
  });


});
