import { Injectable, Inject } from '@angular/core';
import { Product } from 'src/data/models/entities/Product';
import { Subject, BehaviorSubject, Observable, merge } from 'rxjs';
import { ProductFilters } from 'src/app/shared/product-filters-panel/product-filters-panel.component';
import { DATA_INJECTION_TOKENS } from 'src/data/services/data-injection-tokens';
import { EntityDataIService } from 'src/data/services/entity.data.iservice';
import { concatMap, mapTo } from 'rxjs/operators';

@Injectable()
export class ProductsArrayService {

  protected productsArray: Product[] = [];

  protected productsArraySource: Subject<Product[]> = new BehaviorSubject([]);
  protected productFiltersSource: Subject<ProductFilters> = new BehaviorSubject({});

  public productsArray$: Observable<Product[]> = this.productsArraySource.asObservable();
  public loading$: Observable<boolean>;
  public filteredProductsArray$: Observable<Product[]>;

  constructor(
    @Inject(DATA_INJECTION_TOKENS.products) protected productDataService: EntityDataIService<Product>,
  ) {
    this.filteredProductsArray$ = this.productFiltersSource.asObservable().pipe(
      concatMap(
        (filters: ProductFilters) => {
          if (JSON.stringify(filters) !== '{}') {
            return this.productDataService.readFiltered(filters);
          } else {
            return this.productDataService.readAll();
          }
        }
      )
    );

    this.loading$ = merge(
      this.productFiltersSource.asObservable().pipe(mapTo(true)),
      this.filteredProductsArray$.pipe(mapTo(false))
    );
  }

  public changeFiltersTo(filters: ProductFilters): void {
    this.productFiltersSource.next(filters);
  }

  public includeProduct(prod: Product): void {
    this.productsArray.push(prod);
    this.productsArraySource.next(this.productsArray);
  }

  public dropProductByIndex(index: number): void {
    this.productsArray.splice(index, 1);
    this.productsArraySource.next(this.productsArray);
  }
}
