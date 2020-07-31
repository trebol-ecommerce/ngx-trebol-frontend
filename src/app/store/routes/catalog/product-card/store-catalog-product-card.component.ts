import { Component, OnInit, Input } from '@angular/core';
import { StoreCartService } from 'src/app/store/store-cart.service';
import { StoreCatalogService } from '../store-catalog.service';
import { Product } from 'src/data/models/entities/Product';

@Component({
  selector: 'app-store-catalog-product-card',
  templateUrl: './store-catalog-product-card.component.html',
  styleUrls: ['./store-catalog-product-card.component.css']
})
export class StoreCatalogProductCardComponent implements OnInit {

  @Input() public product: Product;

  constructor(
    protected cartService: StoreCartService,
    protected catalogService: StoreCatalogService
  ) { }

  ngOnInit(): void {
  }


  public onClickAddProduct(): void {
    this.cartService.addProductToCart(this.product);
  }

  public onClickViewProduct(): void {
    this.catalogService.viewProduct(this.product);
  }

}
