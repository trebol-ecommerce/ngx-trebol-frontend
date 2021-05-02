// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Inject, Injectable } from '@angular/core';
import { API_SERVICE_INJECTION_TOKENS } from 'src/app/api/api-service-injection-tokens';
import { EntityDataApiIService } from 'src/app/api/data/entity-data-api.iservice';
import { Image } from 'src/app/models/entities/Image';
import { DataManagerServiceDirective } from '../data-manager.service-directive';

@Injectable()
export class ImageManagerService
extends DataManagerServiceDirective<Image> {

  constructor(
    @Inject(API_SERVICE_INJECTION_TOKENS.imagesCrud) protected dataService: EntityDataApiIService<Image>
  ) {
    super();
  }
}
