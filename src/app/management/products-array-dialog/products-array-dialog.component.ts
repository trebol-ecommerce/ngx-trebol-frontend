import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, merge, Observable, Subject } from 'rxjs';
import { concatMap, map, mapTo } from 'rxjs/operators';
import { ProductFilters } from 'src/app/shared/product-filters-panel/product-filters-panel.component';
import { Product } from 'src/data/models/entities/Product';
import { DATA_INJECTION_TOKENS } from 'src/data/services/data-injection-tokens';
import { EntityDataIService } from 'src/data/services/entity.data.iservice';
import { SharedDataIService } from 'src/data/services/shared.data.iservice';

@Component({
  selector: 'app-products-array-dialog',
  templateUrl: './products-array-dialog.component.html',
  styleUrls: [ './products-array-dialog.component.css' ]
})
export class ProductsArrayDialogComponent
  implements OnInit {

  protected productsArray: Product[] = [];

  protected productsArraySource: Subject<Product[]> = new Subject();
  protected productFiltersSource: Subject<ProductFilters> = new BehaviorSubject({});

  public productsArray$: Observable<Product[]> = this.productsArraySource.asObservable();
  public loading$: Observable<boolean>;
  public filteredProductsArray$: Observable<Product[]>;
  public isArrayEmpty$: Observable<boolean>;

  public productTableColumns: string[] = [ 'name', 'price', 'actions' ];


  constructor(
    @Inject(DATA_INJECTION_TOKENS.shared) protected sharedDataService: SharedDataIService,
    @Inject(DATA_INJECTION_TOKENS.products) protected productDataService: EntityDataIService<Product>,
    protected dialog: MatDialogRef<ProductsArrayDialogComponent>,
    protected formBuilder: FormBuilder,
    protected snackBarService: MatSnackBar
  ) {
    this.productsArray = [];

    this.isArrayEmpty$ = this.productsArray$.pipe(map(array => (array.length === 0)));
  }

  ngOnInit(): void {
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

  public onFiltersChange(filters: ProductFilters): void {
    this.productFiltersSource.next(filters);
  }

  public onClickIncludeProduct(prod: Product): void {
    this.productsArray.push(prod);
    this.productsArraySource.next(this.productsArray);
  }

  public onClickDropProduct(index: number): void {
    this.productsArray.splice(index, 1);
    this.productsArraySource.next(this.productsArray);
  }

  public onClickAccept(): void {
    this.dialog.close(this.productsArray);
  }

  public onClickCancel(): void {
    this.dialog.close([]);
  }

}
