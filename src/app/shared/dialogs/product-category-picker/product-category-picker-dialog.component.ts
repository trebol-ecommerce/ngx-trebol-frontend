/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { API_SERVICE_INJECTION_TOKENS } from 'src/app/api/api-service-injection-tokens';
import { ITransactionalEntityDataApiService } from 'src/app/api/transactional-entity.data-api.iservice';
import { ProductCategory } from 'src/models/entities/ProductCategory';

@Component({
  selector: 'app-product-category-picker-dialog',
  templateUrl: './product-category-picker-dialog.component.html',
  styleUrls: ['./product-category-picker-dialog.component.css']
})
export class ProductCategoryPickerDialogComponent {

  categories$: Observable<ProductCategory[]>;

  constructor(
    @Inject(API_SERVICE_INJECTION_TOKENS.dataProductCategories) private apiService: ITransactionalEntityDataApiService<ProductCategory>,
    private dialog: MatDialogRef<ProductCategoryPickerDialogComponent>
  ) {
    this.categories$ = this.apiService.fetchPage().pipe(map(next => next.items));
  }

  onSelect(option: ProductCategory) {
    const simpleCategory: ProductCategory = {
      code: option.code,
      name: option.name
    };
    this.dialog.close(simpleCategory);
  }
}
