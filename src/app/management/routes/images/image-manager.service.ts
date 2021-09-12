// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Inject, Injectable } from '@angular/core';
import { API_SERVICE_INJECTION_TOKENS } from 'src/app/api/api-service-injection-tokens';
import { IEntityDataApiService } from 'src/app/api/entity.data-api.iservice';
import { Image } from 'src/app/models/entities/Image';
import { DataManagerServiceDirective } from '../data-manager.service-directive';

@Injectable()
export class ImageManagerService
  extends DataManagerServiceDirective<Image> {

  constructor(
    @Inject(API_SERVICE_INJECTION_TOKENS.dataImages) protected dataService: IEntityDataApiService<Image>
  ) {
    super();
  }
}
