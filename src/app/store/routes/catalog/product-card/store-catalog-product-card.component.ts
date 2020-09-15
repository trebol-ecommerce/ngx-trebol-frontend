import { Component, Input } from '@angular/core';
import { StoreService } from 'src/app/store/store.service';
import { Product } from 'src/data/models/entities/Product';
import { StoreCatalogService } from '../store-catalog.service';

@Component({
  selector: 'app-store-catalog-product-card',
  templateUrl: './store-catalog-product-card.component.html',
  styleUrls: ['./store-catalog-product-card.component.css']
})
export class StoreCatalogProductCardComponent {

  @Input() public product: Product = null;

  constructor(
    protected cartService: StoreService,
    protected catalogService: StoreCatalogService
  ) { }

  public onClickAddProduct(): void {
    this.cartService.addProductToCart(this.product);
  }

  public onClickViewProduct(): void {
    this.catalogService.viewProduct(this.product);
  }

}
