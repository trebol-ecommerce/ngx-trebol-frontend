// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Inject, Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { API_SERVICE_INJECTION_TOKENS } from 'src/app/api/api-service-injection-tokens';
import { ITransactionalEntityDataApiService } from 'src/app/api/transactional-entity.data-api.iservice';
import { Image } from 'src/app/models/entities/Image';

@Injectable()
export class ImageManagerUploadService
  implements OnDestroy {

  private savingSource = new BehaviorSubject(false);
  saving$: Observable<boolean> = this.savingSource.asObservable();
  isNewItem: boolean;

  constructor(
    @Inject(API_SERVICE_INJECTION_TOKENS.dataImages) protected dataService: ITransactionalEntityDataApiService<Image>
  ) { }

  ngOnDestroy(): void {
    this.savingSource.complete();
  }

  submit(item: File | Image): Observable<boolean> {
    let data: Image;
    if (item instanceof File) {
      data = {
        url: undefined,
        filename: item.name,
        file: item
      };
    } else if (item instanceof Image) {
      data = item;
    }

    this.savingSource.next(true);
    const doSubmit = ((this.isNewItem) ? this.dataService.create(data) : this .dataService.update(data));
    return doSubmit.pipe(
      catchError(() => of(null)),
      tap(() => { this.savingSource.next(false); }),
      map(next => !!(next))
    );
  }
}
