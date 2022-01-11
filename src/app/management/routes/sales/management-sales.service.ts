/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Inject, Injectable } from '@angular/core';
import { Sell } from 'src/models/entities/Sell';
import { SellDetail } from 'src/models/entities/SellDetail';
import { ICompositeEntityDataApiService } from 'src/app/api/composite-entity.data-api.iservice';
import { API_SERVICE_INJECTION_TOKENS } from 'src/app/api/api-service-injection-tokens';
import { TransactionalDataManagerServiceDirective } from '../../directives/transactional-data-manager.service-directive';
import { SharedDialogService } from 'src/app/shared/dialogs/shared-dialog.service';

@Injectable()
export class ManagementSalesService
  extends TransactionalDataManagerServiceDirective<Sell> {

  constructor(
    sharedDialogService: SharedDialogService,
    @Inject(API_SERVICE_INJECTION_TOKENS.dataSales) public dataService: ICompositeEntityDataApiService<Sell, SellDetail>
  ) {
    super(sharedDialogService);
  }
}
