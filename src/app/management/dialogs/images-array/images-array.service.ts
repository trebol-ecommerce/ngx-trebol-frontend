/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Inject, Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, ReplaySubject, Subscription } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { API_SERVICE_INJECTION_TOKENS } from 'src/app/api/api-service-injection-tokens';
import { IEntityDataApiService } from 'src/app/api/entity.data-api.iservice';
import { DataPage } from 'src/models/DataPage';
import { Image } from 'src/models/entities/Image';

@Injectable()
export class ImagesArrayService
  implements OnDestroy {

  private loadingSource = new BehaviorSubject(false);
  private imagesPageSource = new ReplaySubject<DataPage<Image>>(1);
  private fetchingSubscription: Subscription;

  loading$ = this.loadingSource.asObservable();
  imagesPage$ = this.imagesPageSource.asObservable();

  pageIndex: number | undefined;
  pageSize: number | undefined;
  sortBy: string | undefined;
  order: string | undefined;
  filter: any | undefined;

  constructor(
    @Inject(API_SERVICE_INJECTION_TOKENS.dataImages) private imageDataService: IEntityDataApiService<Image>
  ) {
  }

  ngOnDestroy(): void {
    this.imagesPageSource.complete();
    this.fetchingSubscription?.unsubscribe();
  }

  /** Empty item selections and fetch data from the external service again. */
  reloadItems(): void {
    this.fetchingSubscription?.unsubscribe();
    this.loadingSource.next(true);
    const filters = this.filter ? { filenameLike: this.filter } : undefined;
    this.fetchingSubscription = this.imageDataService.fetchPage(this.pageIndex, this.pageSize, this.sortBy, this.order, filters).pipe(
      tap(page => { this.imagesPageSource.next(page); }),
      finalize(() => { this.loadingSource.next(false); })
    ).subscribe();
  }

}
