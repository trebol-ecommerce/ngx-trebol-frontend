import { Inject, Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { delay, finalize, tap } from 'rxjs/operators';
import { ProductFilters } from 'src/app/shared/product-filters-panel/product-filters-panel.component';
import { Product } from 'src/data/models/entities/Product';
import { DATA_INJECTION_TOKENS } from 'src/data/services/data-injection-tokens';
import { EntityDataIService } from 'src/data/services/entity.data.iservice';

@Injectable()
export class StoreCatalogService
  implements OnDestroy {

  protected loadingSource: Subject<boolean> = new BehaviorSubject(false);
  protected itemsSource: Subject<Product[]> = new Subject();

  public loading$: Observable<boolean> = this.loadingSource.asObservable();
  public items$: Observable<Product[]> = this.itemsSource.asObservable();

  public filters: ProductFilters = {};

  constructor(
    @Inject(DATA_INJECTION_TOKENS.products) protected productDataService: EntityDataIService<Product>
  ) { }

  ngOnDestroy(): void {
    this.loadingSource.complete();
    this.itemsSource.complete();
  }

  public reloadItems(): void {
    this.loadingSource.next(true);

    let p: Observable<Product[]>;

    if (JSON.stringify(this.filters) !== '{}') {
      p = this.productDataService.readFiltered(this.filters);
    } else {
      p = this.productDataService.readAll();
    }

    p.pipe(
      delay(0),
      tap(items => this.itemsSource.next(items)),
      finalize(() => { this.loadingSource.next(false); })
    ).subscribe();
  }

}
