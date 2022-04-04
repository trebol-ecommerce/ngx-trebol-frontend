/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Inject, Injectable } from '@angular/core';
import { API_INJECTION_TOKENS } from 'src/app/api/api-injection-tokens';
import { ITransactionalEntityDataApiService } from 'src/app/api/transactional-entity.data-api.iservice';
import { SharedDialogService } from 'src/app/shared/dialogs/shared-dialog.service';
import { Salesperson } from 'src/models/entities/Salesperson';
import { TransactionalDataManagerServiceDirective } from '../../directives/transactional-data-manager/transactional-data-manager.service.directive';

@Injectable()
export class ManagementSalespeopleService
  extends TransactionalDataManagerServiceDirective<Salesperson> {

  constructor(
    sharedDialogService: SharedDialogService,
    @Inject(API_INJECTION_TOKENS.dataSalespeople) public dataService: ITransactionalEntityDataApiService<Salesperson>
  ) {
    super(sharedDialogService);
  }
}
