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
  selector: 'app-store-product-display',
  templateUrl: './store-product-display.component.html',
  styleUrls: ['./store-product-display.component.css']
})
export class StoreProductDisplayComponent {

  @Input() products: Product[];
  @Input() pageSizeOptions = [ 8, 20, 40, 80 ];
  @Input() showPaginator = true;
  @Input() scrollable = true;
  @Input() totalCount = 0;

  @Output() page = new EventEmitter<PageEvent>();

  onPage(event: PageEvent): void {
    this.page.emit(event);
  }

}
