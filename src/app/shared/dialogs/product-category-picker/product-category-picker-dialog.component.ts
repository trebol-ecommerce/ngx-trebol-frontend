/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ProductCategory } from 'src/models/entities/ProductCategory';
import { ProductCategoryTreeService } from '../../components/product-category-tree/product-category-tree.service';

@Component({
  selector: 'app-product-category-picker-dialog',
  templateUrl: './product-category-picker-dialog.component.html',
  styleUrls: ['./product-category-picker-dialog.component.css']
})
export class ProductCategoryPickerDialogComponent
  implements OnInit {

  constructor(
    private dialog: MatDialogRef<ProductCategoryPickerDialogComponent>,
    private categoryTreeService: ProductCategoryTreeService
  ) { }

  ngOnInit(): void {
    this.categoryTreeService.reloadCategories();
  }

  onSelect(option: ProductCategory) {
    const simpleCategory: ProductCategory = {
      code: option.code,
      name: option.name
    };
    this.dialog.close(simpleCategory);
  }
}
