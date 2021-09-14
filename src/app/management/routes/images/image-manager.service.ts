// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Inject, Injectable } from '@angular/core';
import { API_SERVICE_INJECTION_TOKENS } from 'src/app/api/api-service-injection-tokens';
import { ITransactionalEntityDataApiService } from 'src/app/api/transactional-entity.data-api.iservice';
import { Image } from 'src/app/models/entities/Image';
import { TransactionalDataManagerServiceDirective } from '../../directives/transactional-data-manager.service-directive';

@Injectable()
export class ImageManagerService
  extends TransactionalDataManagerServiceDirective<Image> {

  constructor(
    @Inject(API_SERVICE_INJECTION_TOKENS.dataImages) public dataService: ITransactionalEntityDataApiService<Image>
  ) {
    super();
  }
}
