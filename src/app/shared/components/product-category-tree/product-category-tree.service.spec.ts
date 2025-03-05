/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { API_INJECTION_TOKENS } from 'src/app/api/api-injection-tokens';
import { ITransactionalEntityDataApiService } from 'src/app/api/transactional-entity.data-api.iservice';
import { ProductCategory } from 'src/models/entities/ProductCategory';
import { ProductCategoryTreeService } from './product-category-tree.service';
import { ApiDataPageQuerySpec } from 'src/models/ApiDataPageQuerySpec';

describe('ProductCategoryTreeService', () => {
  let service: ProductCategoryTreeService;
  let apiServiceSpy: jasmine.SpyObj<ITransactionalEntityDataApiService<ProductCategory>>;

  beforeEach(() => {
    const mockApiService = jasmine.createSpyObj('ITransactionalEntityDataApiService<ProductCategory>', ['fetchPage', 'fetchExisting', 'create', 'update', 'delete']);

    TestBed.configureTestingModule({
      providers: [
        { provide: API_INJECTION_TOKENS.dataProductCategories, useValue: mockApiService },
      ]
    });
  });

  beforeEach(() => {
    apiServiceSpy = TestBed.inject(API_INJECTION_TOKENS.dataProductCategories) as jasmine.SpyObj<ITransactionalEntityDataApiService<ProductCategory>>;
    apiServiceSpy.fetchPage.and.returnValue(of({
      pageIndex: 0,
      items: [],
      totalCount: 0,
      pageSize: 10
    }));
    apiServiceSpy.fetchExisting.and.returnValue(of({} as ProductCategory));
    apiServiceSpy.create.and.returnValue(of(void 0));
    apiServiceSpy.update.and.returnValue(of(void 0));
    apiServiceSpy.delete.and.returnValue(of(void 0));

    service = TestBed.inject(ProductCategoryTreeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch the root categories', () => {
    service.reloadCategories().pipe(
      tap(() => expect(apiServiceSpy.fetchPage).toHaveBeenCalled())
    ).subscribe();
  });

  it('should fetch descendants of root categories ', () => {
    // limit recursivity
    const querySpec = {} as ApiDataPageQuerySpec;
    apiServiceSpy.fetchPage.and.callFake((querySpec) => of({
      pageIndex: 0,
      items: [{
          code: 'some-code',
          name: 'some-name'
        }],
      totalCount: 1,
      pageSize: 10
    }));

    // the spy could be called infinite times were the check for 'filter' absent
    service.reloadCategories().pipe(
      tap(() => expect(apiServiceSpy.fetchPage).toHaveBeenCalledTimes(2))
    ).subscribe();
  });

  it('should add categories', () => {
    const category: ProductCategory = {
      code: 'some-code',
      name: 'some-name',
    };
    service.add(category).subscribe();
    expect(apiServiceSpy.create).toHaveBeenCalled();
  });

  it('should edit categories', () => {
    const original: ProductCategory = {
      code: 'some-code',
      name: 'some-name',
    };
    const category2: ProductCategory = {
      code: 'some-code2',
      name: 'some-name2',
    };
    service.edit(category2, original).subscribe();
    expect(apiServiceSpy.update).toHaveBeenCalled();
  });

  it('should remove categories', () => {
    const category: ProductCategory = {
      code: 'some-code',
      name: 'some-name',
    };
    service.remove(category).subscribe();
    expect(apiServiceSpy.delete).toHaveBeenCalled();
  });

});
