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
import { User } from 'src/models/entities/User';
import { TransactionalDataManagerServiceDirective } from '../../directives/transactional-data-manager/transactional-data-manager.service.directive';

@Injectable()
export class ManagementUsersService
  extends TransactionalDataManagerServiceDirective<User> {

  constructor(
    sharedDialogService: SharedDialogService,
    @Inject(API_INJECTION_TOKENS.dataUsers) public dataService: ITransactionalEntityDataApiService<User>
  ) {
    super(sharedDialogService);
  }
}
