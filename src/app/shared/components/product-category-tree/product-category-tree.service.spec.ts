/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { API_INJECTION_TOKENS } from 'src/app/api/api-injection-tokens';
import { ITransactionalEntityDataApiService } from 'src/app/api/transactional-entity.data-api.iservice';
import { ProductCategory } from 'src/models/entities/ProductCategory';
import { ProductCategoryTreeService } from './product-category-tree.service';

describe('ProductCategoryTreeService', () => {
  let service: ProductCategoryTreeService;
  let apiServiceSpy: jasmine.SpyObj<ITransactionalEntityDataApiService<ProductCategory>>;

  beforeEach(() => {
    const mockApiService = jasmine.createSpyObj('ITransactionalEntityDataApiService<ProductCategory>', ['fetchPage', 'create', 'update', 'delete']);

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
    apiServiceSpy.create.and.returnValue(of(void 0));
    apiServiceSpy.update.and.returnValue(of(void 0));
    apiServiceSpy.delete.and.returnValue(of(void 0));

    service = TestBed.inject(ProductCategoryTreeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch the root categories', () => {
    service.reloadCategories();
    expect(apiServiceSpy.fetchPage).toHaveBeenCalled();
  });

  it('should fetch descendants of root categories ', () => {
    // limit recursivity
    apiServiceSpy.fetchPage.and.callFake((index, size, sortBy, order, filter) => of({
      pageIndex: 0,
      items: filter ?
        [] :
        [{
          code: 'some-code',
          name: 'some-name'
        }],
      totalCount: filter ? 0 : 1,
      pageSize: 10
    }));

    service.reloadCategories();
    // the spy could be called infinite times if the check for 'filter' was absent
    expect(apiServiceSpy.fetchPage).toHaveBeenCalledTimes(2);
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
