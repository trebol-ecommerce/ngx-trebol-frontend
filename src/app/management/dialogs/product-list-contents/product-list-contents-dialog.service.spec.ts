/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { TestBed } from '@angular/core/testing';
import { EMPTY, of } from 'rxjs';
import { API_INJECTION_TOKENS } from 'src/app/api/api-injection-tokens';
import { MOCK_PRODUCTS } from 'src/app/api/local-memory/mock-data/mock-products.datasource';
import { ITransactionalProductListContentsDataApiService } from 'src/app/api/transactional-product-list-contents.data.api.iservice';
import { ProductList } from 'src/models/entities/ProductList';
import { ProductListContentsDialogService } from './product-list-contents-dialog.service';

const mockProduct = MOCK_PRODUCTS[0];
const mockProducts = MOCK_PRODUCTS.slice(0,3);

describe('ProductListContentsDialogService', () => {
  let service: ProductListContentsDialogService;
  let apiServiceSpy: jasmine.SpyObj<ITransactionalProductListContentsDataApiService>;

  beforeEach(() => {
    const mockApiService = jasmine.createSpyObj('ITransactionalProductListContentsDataApiService', ['fetchPage', 'fetchContents', 'addToContents', 'updateContents', 'deleteFromContents']);

    TestBed.configureTestingModule({
      providers: [
        ProductListContentsDialogService,
        { provide: API_INJECTION_TOKENS.dataProductLists, useValue: mockApiService }
      ]
    });
  });

  beforeEach(() => {
    apiServiceSpy = TestBed.inject(API_INJECTION_TOKENS.dataProductLists) as jasmine.SpyObj<ITransactionalProductListContentsDataApiService>
    apiServiceSpy.addToContents.and.returnValue(EMPTY);
    apiServiceSpy.updateContents.and.returnValue(EMPTY);
    apiServiceSpy.deleteFromContents.and.returnValue(EMPTY);
    apiServiceSpy.fetchPage.and.returnValue(of({
      items: [],
      totalCount: 0,
      pageIndex: 0,
      pageSize: 10
    }));
    service = TestBed.inject(ProductListContentsDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('without a list reference', () => {
    it('should not add products', () => {
      service.addProduct(mockProduct).subscribe();
      expect(apiServiceSpy.addToContents).not.toHaveBeenCalled();
    });

    it('should not replace products', () => {
      service.replaceProductsWith(mockProducts).subscribe();
      expect(apiServiceSpy.updateContents).not.toHaveBeenCalled();
    });

    it('should not remove products', () => {
      service.removeProduct(mockProduct).subscribe();
      expect(apiServiceSpy.deleteFromContents).not.toHaveBeenCalled();
    });
  });

  describe('when it has a list reference', () => {
    beforeEach(() => {
      service.list = new ProductList();
    });

    it('should add products to the list', () => {
      service.addProduct(mockProduct).subscribe();
      expect(apiServiceSpy.addToContents).toHaveBeenCalled();
    });

    it('should replace products in the list', () => {
      service.replaceProductsWith(mockProducts).subscribe();
      expect(apiServiceSpy.updateContents).toHaveBeenCalled();
    });

    it('should remove products from the list', () => {
      service.removeProduct(mockProduct).subscribe();
      expect(apiServiceSpy.deleteFromContents).toHaveBeenCalled();
    });
  });
});
