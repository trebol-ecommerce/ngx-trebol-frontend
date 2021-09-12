// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Inject, Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { DataManagerFormServiceDirective } from '../../data-manager-form.service-directive';
import { Product } from 'src/app/models/entities/Product';
import { ProductFamily } from 'src/app/models/entities/ProductFamily';
import { ProductType } from 'src/app/models/entities/ProductType';
import { API_SERVICE_INJECTION_TOKENS } from 'src/app/api/api-service-injection-tokens';
import { IEntityDataApiService } from 'src/app/api/entity.data-api.iservice';
import { ISharedDataApiService } from 'src/app/api/shared.data-api.iservice';

@Injectable()
export class ProductManagerFormService
  extends DataManagerFormServiceDirective<Product>
  implements OnDestroy {

  protected selectedFamilyIdSource: Subject<number> = new BehaviorSubject(undefined);

  public productTypes$: Observable<ProductType[]>;

  constructor(
    @Inject(API_SERVICE_INJECTION_TOKENS.dataProducts) protected dataService: IEntityDataApiService<Product>,
    @Inject(API_SERVICE_INJECTION_TOKENS.dataShared) protected sharedDataService: ISharedDataApiService
  ) {
    super();

    this.productTypes$ = this.selectedFamilyIdSource.asObservable().pipe(
      switchMap(
        (id: number) => {
          if (!id) {
            return of([]);
          } else {
            return this.sharedDataService.readAllProductTypesByFamilyId(id);
          }
        }
      )
    );
  }

  ngOnDestroy(): void {
    this.selectedFamilyIdSource.complete();
  }

  public getAllProductFamilies(): Observable<ProductFamily[]> {
    return this.sharedDataService.readAllProductFamilies();
  }

  public updateSelectedFamily(productFamilyId: number): void {
    this.selectedFamilyIdSource.next(productFamilyId);
  }
}
