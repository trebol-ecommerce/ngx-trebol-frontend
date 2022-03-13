/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Inject, Injectable } from '@angular/core';
import { API_SERVICE_INJECTION_TOKENS } from 'src/app/api/api-service-injection-tokens';
import { ITransactionalEntityDataApiService } from 'src/app/api/transactional-entity.data-api.iservice';
import { SharedDialogService } from 'src/app/shared/dialogs/shared-dialog.service';
import { ProductList } from 'src/models/entities/ProductList';
import { TransactionalDataManagerServiceDirective } from '../../directives/transactional-data-manager/transactional-data-manager.service.directive';

@Injectable()
export class ManagementProductListsService
  extends TransactionalDataManagerServiceDirective<ProductList> {

  constructor(
    sharedDialogService: SharedDialogService,
    @Inject(API_SERVICE_INJECTION_TOKENS.dataProductLists) public dataService: ITransactionalEntityDataApiService<ProductList>
  ) {
    super(sharedDialogService);
  }
}
