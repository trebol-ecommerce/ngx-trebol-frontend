import { Inject, Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { DataManagerFormService } from '../../data-manager-form.aservice';
import { Product } from 'src/app/data/models/entities/Product';
import { ProductFamily } from 'src/app/data/models/entities/ProductFamily';
import { ProductType } from 'src/app/data/models/entities/ProductType';
import { DATA_INJECTION_TOKENS } from 'src/app/data/data-injection-tokens';
import { EntityCrudIService } from 'src/app/data/entity.crud.iservice';
import { SharedDataIService } from 'src/app/data/shared.data.iservice';

@Injectable()
export class ProductManagerFormService
  extends DataManagerFormService<Product>
  implements OnDestroy {

  protected selectedFamilyIdSource: Subject<number> = new BehaviorSubject(undefined);

  public productTypes$: Observable<ProductType[]>;

  constructor(
    @Inject(DATA_INJECTION_TOKENS.products) protected dataService: EntityCrudIService<Product>,
    @Inject(DATA_INJECTION_TOKENS.shared) protected sharedDataService: SharedDataIService
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
