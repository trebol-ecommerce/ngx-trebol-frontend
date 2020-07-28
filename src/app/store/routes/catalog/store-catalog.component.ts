import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { ProductFilters } from 'src/app/shared/product-filters-panel/product-filters-panel.component';
import { StoreCartService } from 'src/app/store/store-cart.service';
import { Product } from 'src/data/models/entities/Product';
import { DATA_INJECTION_TOKENS } from 'src/data/services/data-injection-tokens';
import { EntityDataIService } from 'src/data/services/entity.data.iservice';
import { StoreCatalogService } from './store-catalog.service';

@Component({
  selector: 'app-store-catalog',
  templateUrl: './store-catalog.component.html',
  styleUrls: ['./store-catalog.component.css']
})
export class StoreCatalogComponent
  implements OnInit {

  public loading$: Observable<boolean>;
  public products$: Observable<Product[]>;

  constructor(
    @Inject(DATA_INJECTION_TOKENS.products) protected productDataService: EntityDataIService<Product>,
    protected snackBarService: MatSnackBar,
    protected cartService: StoreCartService,
    protected catalogService: StoreCatalogService
  ) {
    this.loading$ = this.catalogService.loading$.pipe();
    this.products$ = this.catalogService.items$.pipe();
  }

  ngOnInit(): void {
    this.catalogService.reloadItems();
  }

  public onFiltersChange(f: ProductFilters) {
    this.catalogService.filters = f;
    this.catalogService.reloadItems();
  }

  public onClickAddProduct(p: Product): void {
    this.cartService.addProductToCart(p);
  }

  public onClickViewProduct(p: Product): void {
    this.catalogService.viewProduct(p);
  }

}
