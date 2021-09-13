// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Inject, Injectable } from '@angular/core';
import { API_SERVICE_INJECTION_TOKENS } from 'src/app/api/api-service-injection-tokens';
import { Image } from 'src/app/models/entities/Image';
import { DataManagerFormServiceDirective } from '../../data-manager-form.service-directive';
import { Observable, of, throwError } from 'rxjs';
import { ITransactionalEntityDataApiService } from 'src/app/api/transactional-entity.data-api.iservice';

@Injectable()
export class ImageManagerUploadService
  extends DataManagerFormServiceDirective<Image> {

  constructor(
    @Inject(API_SERVICE_INJECTION_TOKENS.dataImages) protected dataService: ITransactionalEntityDataApiService<Image>
  ) {
    super();
  }

  submit(item: File | Image): Observable<boolean> {
    return (item instanceof File) ?
              super.submit({
                url: undefined,
                filename: item.name,
                file: item
              }) :
            (item instanceof Image) ?
              super.submit(item) :
              throwError({ message: 'Incorrect item passed' });
  }
}
