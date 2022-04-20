/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { API_INJECTION_TOKENS } from 'src/app/api/api-injection-tokens';
import { IEntityDataApiService } from 'src/app/api/entity.data-api.iservice';
import { DataPage } from 'src/models/DataPage';
import { Image } from 'src/models/entities/Image';

@Injectable()
export class ImagesArrayService {

  private loadingSource = new BehaviorSubject(false);
  private imagesPageSource = new ReplaySubject<DataPage<Image>>(1);

  loading$ = this.loadingSource.asObservable();
  imagesPage$ = this.imagesPageSource.asObservable();

  pageIndex: number | undefined;
  pageSize: number | undefined;
  sortBy: string | undefined;
  order: string | undefined;
  filter: any | undefined;

  constructor(
    @Inject(API_INJECTION_TOKENS.dataImages) private imageDataService: IEntityDataApiService<Image>
  ) { }

  /** Empty item selections and fetch data from the external service again. */
  reloadItems() {
    this.loadingSource.next(true);
    const filters = this.filter ? { filenameLike: this.filter } : undefined;
    return this.imageDataService.fetchPage(this.pageIndex, this.pageSize, this.sortBy, this.order, filters).pipe(
      tap(page => { this.imagesPageSource.next(page); }),
      finalize(() => { this.loadingSource.next(false); })
    );
  }

}
