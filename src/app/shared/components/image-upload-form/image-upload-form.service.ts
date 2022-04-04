/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Inject, Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { API_INJECTION_TOKENS } from 'src/app/api/api-injection-tokens';
import { ITransactionalEntityDataApiService } from 'src/app/api/transactional-entity.data-api.iservice';
import { Image } from 'src/models/entities/Image';

@Injectable({ providedIn: 'root' })
export class ImageManagerUploadService
  implements OnDestroy {

  private savingSource = new BehaviorSubject(false);
  saving$: Observable<boolean> = this.savingSource.asObservable();
  isNewItem: boolean;

  constructor(
    @Inject(API_INJECTION_TOKENS.dataImages) private dataService: ITransactionalEntityDataApiService<Image>
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
