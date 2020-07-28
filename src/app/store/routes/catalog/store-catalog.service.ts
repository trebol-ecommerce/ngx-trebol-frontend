import { Inject, Injectable, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { concatMap, delay, map, tap } from 'rxjs/operators';
import { ProductFilters } from 'src/app/shared/product-filters-panel/product-filters-panel.component';
import { Product } from 'src/data/models/entities/Product';
import { DATA_INJECTION_TOKENS } from 'src/data/services/data-injection-tokens';
import { EntityDataIService } from 'src/data/services/entity.data.iservice';
import { StoreProductDetailsDialogComponent, StoreProductDetailsDialogData } from '../../dialogs/product-details/store-product-details-dialog.component';

@Injectable()
export class StoreCatalogService
  implements OnDestroy {

  protected itemsSource: Subject<Product[]> = new BehaviorSubject(null);

  public items$: Observable<Product[]> = this.itemsSource.asObservable();
  public loading$: Observable<boolean>;

  public filters: ProductFilters = {};

  constructor(
    @Inject(DATA_INJECTION_TOKENS.products) protected productDataService: EntityDataIService<Product>,
    protected dialogService: MatDialog,
    protected route: ActivatedRoute,
    protected router: Router,
  ) {
    this.loading$ = this.items$.pipe(map(items => (items === null)));
    this.checkRouteForProductIdParam();
  }

  public promptProductDetails(product: Product): Observable<any> {
    const dialogData: StoreProductDetailsDialogData = { product };
    return this.dialogService.open(
      StoreProductDetailsDialogComponent,
      {
        width: '40rem',
        data: dialogData
      }
    ).afterClosed().pipe(
      tap(() => {
        this.router.navigate(
          [],
          {
            relativeTo: this.route,
            queryParams: {}
          }
        );
      })
    );
  }

  protected checkRouteForProductIdParam(): void {
    this.route.queryParamMap.subscribe(
      (params) => {
        if (params.has('id')) {
          const id = Number(params.get('id'));
          this.productDataService.readById(id).pipe(
            concatMap(p => this.promptProductDetails(p))
          ).subscribe();
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.itemsSource.complete();
  }

  public reloadItems(): void {
    this.itemsSource.next(null);

    let p: Observable<Product[]>;

    if (JSON.stringify(this.filters) !== '{}') {
      p = this.productDataService.readFiltered(this.filters);
    } else {
      p = this.productDataService.readAll();
    }

    p.pipe(
      delay(0)
    ).subscribe(
      items => this.itemsSource.next(items)
    );
  }

  public viewProduct(p: Product): void {
    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: { id: p.id },
        queryParamsHandling: 'merge'
      }
    );
  }

}
