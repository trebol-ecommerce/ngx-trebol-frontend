import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/data/models/entities/Product';
import { ProductFilters } from 'src/shared/product-filters-panel/product-filters-panel.component';
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
