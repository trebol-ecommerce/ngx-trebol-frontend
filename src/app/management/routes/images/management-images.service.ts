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
import { Image } from 'src/models/entities/Image';
import { TransactionalDataManagerServiceDirective } from '../../directives/transactional-data-manager.service-directive';

@Injectable()
export class ManagementImagesService
  extends TransactionalDataManagerServiceDirective<Image> {

  constructor(
    sharedDialogService: SharedDialogService,
    @Inject(API_SERVICE_INJECTION_TOKENS.dataImages) public dataService: ITransactionalEntityDataApiService<Image>
  ) {
    super(sharedDialogService);
  }
}
