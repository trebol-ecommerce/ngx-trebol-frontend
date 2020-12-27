// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CompanyDetails } from 'src/app/models/CompanyDetails';
import { StoreApiIService } from '../store-api.iservice';
import { ProductFamily } from 'src/app/models/entities/ProductFamily';
import { ProductType } from 'src/app/models/entities/ProductType';
import { Product } from 'src/app/models/entities/Product';
import { MOCK_PRODUCTS } from 'src/app/api/data/local-memory/impl/products.local-memory-data-api.service';
import { ProductFilters } from 'src/app/shared/product-filters-panel/product-filters-panel.component';
import { MOCK_PRODUCT_TYPES, MOCK_PRODUCT_FAMILIES } from 'src/app/api/data/local-memory/impl/shared.local-memory-data-api.service';
import { SellDetail } from 'src/app/models/entities/SellDetail';
import { ExternalPaymentRedirectionData } from 'src/app/models/ExternalPaymentRedirectionData';
import { Receipt } from 'src/app/models/entities/Receipt';

export const MOCK_COMPANY_DETAILS: CompanyDetails = {
  name: 'Importaciones NBazaar',
  description: 'Somos una pequeña empresa de importación de ropa y calzado. Llevamos más de 4 años en el mercado, conectando la manufactura fuera del país con el retail nacional.',
  bannerImageURL: 'assets/img/mikael-frivold-vJ1Pf0d-0HY-unsplash.jpg',
  logoImageURL: 'assets/img/logo.png'
};

export const MOCK_EXTERNAL_PAYMENT_REDIRECT_DATA: ExternalPaymentRedirectionData = {
  url: '',
  token: ''
};


@Injectable()
export class LocalMemoryStoreApiService
  implements StoreApiIService {

  protected items: Product[] = MOCK_PRODUCTS.map(p => Object.assign(new Product(), p));


  protected filterItems(filter: ProductFilters): Product[] {
    let matchingItems = this.items;
    if (filter.name) {
      matchingItems = matchingItems.filter(
        it => it.name.toUpperCase().includes(filter.name.toUpperCase())
      );
    }
    if (filter.familyId) {
      matchingItems = matchingItems.filter(
        it => it.productType.productFamily.id === filter.familyId
      );
    }
    if (filter.typeId) {
      matchingItems = matchingItems.filter(
        it => it.productType.id === filter.typeId
      );
    }

    return matchingItems;
  }

  public fetchProductById(id: number): Observable<Product> {
    return new Observable(
      observer => {
        const index = this.items.findIndex(d => d.id === id);
        if (index === -1) {
          observer.error({ status: 404 });
        }

        observer.next(this.items[index]);
        observer.complete();

        return {
          unsubscribe() {}
        };
      }
    );
  }

  public fetchStoreFrontProductCollection(): Observable<Product[]> {
    return of(this.items);
  }

  public fetchFilteredProductCollection(filter: ProductFilters): Observable<Product[]> {
    return new Observable(
      observer => {
        const matchingItems = this.filterItems(filter);
        observer.next(matchingItems);
        observer.complete();

        return {
          unsubscribe() {}
        };
      }
    );
  }

  public fetchProductTypesByFamilyId(productFamilyId: number): Observable<ProductType[]> {
    return of(MOCK_PRODUCT_TYPES.filter(t => t.productFamily.id === productFamilyId)
      .map(t => Object.assign(new ProductType(), t))
    );
  }

  public fetchAllProductFamilies(): Observable<ProductFamily[]> {
    return of(MOCK_PRODUCT_FAMILIES.map(f => Object.assign(new ProductFamily(), f)));
  }

  public fetchCompanyDetails(): Observable<CompanyDetails> {
    return of(MOCK_COMPANY_DETAILS);
  }

  public submitCart(): Observable<ExternalPaymentRedirectionData> {
    return of(MOCK_EXTERNAL_PAYMENT_REDIRECT_DATA);
  }

  public fetchTransactionReceiptById(id: number): Observable<Receipt> {
    throw new Error('Method not implemented.');
  }
}
