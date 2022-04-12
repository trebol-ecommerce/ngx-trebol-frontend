/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Inject, Injectable } from '@angular/core';
import { API_INJECTION_TOKENS } from 'src/app/api/api-injection-tokens';
import { ITransactionalEntityDataApiService } from 'src/app/api/transactional-entity.data-api.iservice';
import { ProductCategoryTreeService } from 'src/app/shared/components/product-category-tree/product-category-tree.service';
import { SharedDialogService } from 'src/app/shared/dialogs/shared-dialog.service';
import { ProductCategory } from 'src/models/entities/ProductCategory';
import { TransactionalDataManagerServiceDirective } from '../../directives/transactional-data-manager/transactional-data-manager.service.directive';

@Injectable()
export class ManagementProductCategoriesService
  extends TransactionalDataManagerServiceDirective<ProductCategory> {

  constructor(
    sharedDialogService: SharedDialogService,
    @Inject(API_INJECTION_TOKENS.dataProductCategories) public dataService: ITransactionalEntityDataApiService<ProductCategory>,
    private categoryTreeService: ProductCategoryTreeService
  ) {
    super(sharedDialogService);
  }

  reloadItems(): void {
    this.categoryTreeService.reloadCategories();
  }
}
