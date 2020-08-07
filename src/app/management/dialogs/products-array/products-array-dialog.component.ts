import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ProductFilters } from 'src/app/shared/product-filters-panel/product-filters-panel.component';
import { Product } from 'src/data/models/entities/Product';
import { ProductsArrayService } from './products-array.service';

@Component({
  providers: [ ProductsArrayService ],
  selector: 'app-products-array-dialog',
  templateUrl: './products-array-dialog.component.html',
  styleUrls: [ './products-array-dialog.component.css' ]
})
export class ProductsArrayDialogComponent
  implements OnInit {

  protected productsArray: Product[];

  public filteredProductsArray$: Observable<Product[]>;
  public productsArray$: Observable<Product[]>;
  public loading$: Observable<boolean>;
  public isArrayEmpty$: Observable<boolean>;

  public productTableColumns: string[] = [ 'name', 'price', 'actions' ];

  constructor(
    protected service: ProductsArrayService,
  ) {
    this.productsArray$ = this.service.productsArray$.pipe(tap(p => { this.productsArray = p; }));
    this.isArrayEmpty$ = this.productsArray$.pipe(map(array => (array.length === 0)));
  }

  ngOnInit(): void {
    this.filteredProductsArray$ = this.service.filteredProductsArray$.pipe();
    this.loading$ = this.service.loading$.pipe();
  }

  public onFiltersChange(f: ProductFilters): void {
    this.service.changeFiltersTo(f);
  }

  public onClickIncludeProduct(p: Product): void {
    this.service.includeProduct(p);
  }

  public onClickDropProduct(i: number): void {
    this.service.dropProductByIndex(i);
  }

}
