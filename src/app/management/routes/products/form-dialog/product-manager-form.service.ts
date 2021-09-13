// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Inject, Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { Product } from 'src/app/models/entities/Product';
import { ProductCategory } from 'src/app/models/entities/ProductCategory';
import { API_SERVICE_INJECTION_TOKENS } from 'src/app/api/api-service-injection-tokens';
import { ICategoriesPublicApiService } from 'src/app/api/categories-public-api.iservice';
import { ITransactionalEntityDataApiService } from 'src/app/api/transactional-entity.data-api.iservice';
import { DataManagerFormServiceDirective } from '../../data-manager-form.service-directive';

@Injectable()
export class ProductManagerFormService
  extends DataManagerFormServiceDirective<Product>
  implements OnDestroy {

  private selectedCategoryIdSource = new BehaviorSubject('');

  categories$: Observable<ProductCategory[]>;

  constructor(
    @Inject(API_SERVICE_INJECTION_TOKENS.dataProducts) protected dataService: ITransactionalEntityDataApiService<Product>,
    @Inject(API_SERVICE_INJECTION_TOKENS.categories) private categoriesApiService: ICategoriesPublicApiService
  ) {
    super();

    this.categories$ = this.selectedCategoryIdSource.asObservable().pipe(
      switchMap(id => {
        if (!id) {
          return of([]);
        } else {
          return this.categoriesApiService.fetchChildrenProductCategoriesByParentCode(id).pipe(
            map(page => page.items)
          );
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.selectedCategoryIdSource.complete();
  }

  getAllRootProductCategories(): Observable<ProductCategory[]> {
    return this.categoriesApiService.fetchRootProductCategories().pipe(
      map(page => page.items)
    );
  }

  updateSelectedCategory(categoryCode: string): void {
    this.selectedCategoryIdSource.next(categoryCode);
  }
}
