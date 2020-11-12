// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Inject, Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { DataManagerFormService } from '../../data-manager-form.aservice';
import { Product } from 'src/app/models/entities/Product';
import { ProductFamily } from 'src/app/models/entities/ProductFamily';
import { ProductType } from 'src/app/models/entities/ProductType';
import { API_SERVICE_INJECTION_TOKENS } from 'src/app/api/api-service-injection-tokens';
import { EntityDataApiIService } from 'src/app/api/data-mgt/entity-data-api.iservice';
import { SharedDataApiIService } from 'src/app/api/data-mgt/shared-data-api.iservice';

@Injectable()
export class ProductManagerFormService
  extends DataManagerFormService<Product>
  implements OnDestroy {

  protected selectedFamilyIdSource: Subject<number> = new BehaviorSubject(undefined);

  public productTypes$: Observable<ProductType[]>;

  constructor(
    @Inject(API_SERVICE_INJECTION_TOKENS.productsCrud) protected dataService: EntityDataApiIService<Product>,
    @Inject(API_SERVICE_INJECTION_TOKENS.shared) protected sharedDataService: SharedDataApiIService
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
