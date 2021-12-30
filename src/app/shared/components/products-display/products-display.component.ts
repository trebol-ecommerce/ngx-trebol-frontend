/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Product } from 'src/models/entities/Product';

@Component({
  selector: 'app-products-display',
  templateUrl: './products-display.component.html',
  styleUrls: ['./products-display.component.css']
})
export class ProductsDisplayComponent {

  @Input() products: Product[];
  @Input() pageSizeOptions = [ 8, 20, 40, 80 ];
  @Input() showPaginator = true;
  @Input() showAddToCartButtons = false;
  @Input() scrollable = true;
  @Input() totalCount = 0;
  @Input() pageIndex = 0;
  @Input() pageSize = 10;

  @Output() page = new EventEmitter<PageEvent>();
  @Output() addProductToCart = new EventEmitter<Product>();

  onAddProductToCart(product: Product): void {
    this.addProductToCart.emit(product);
  }

  onPage(event: PageEvent): void {
    this.page.emit(event);
  }

}
