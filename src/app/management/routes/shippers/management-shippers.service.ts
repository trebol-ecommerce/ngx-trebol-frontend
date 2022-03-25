/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Inject, Injectable } from '@angular/core';
import { API_SERVICE_INJECTION_TOKENS } from 'src/app/api/api-service-injection-tokens';
import { ITransactionalEntityDataApiService } from 'src/app/api/transactional-entity.data-api.iservice';
import { SharedDialogService } from 'src/app/shared/dialogs/shared-dialog.service';
import { Shipper } from 'src/models/entities/Shipper';
import { TransactionalDataManagerServiceDirective } from '../../directives/transactional-data-manager/transactional-data-manager.service.directive';

@Injectable()
export class ManagementShippersService
  extends TransactionalDataManagerServiceDirective<Shipper> {

  constructor(
    sharedDialogService: SharedDialogService,
    @Inject(API_SERVICE_INJECTION_TOKENS.dataShippers) public dataService: ITransactionalEntityDataApiService<Shipper>
  ) {
    super(sharedDialogService);
  }
}
