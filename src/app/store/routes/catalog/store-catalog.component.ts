import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { ProductFilters } from 'src/app/shared/product-filters-panel/product-filters-panel.component';
import { StoreCartService } from 'src/app/store/store-cart.service';
import { Product } from 'src/data/models/entities/Product';
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

}
