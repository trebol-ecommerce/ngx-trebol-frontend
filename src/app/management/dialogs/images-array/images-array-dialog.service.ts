/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, concat, from, of, ReplaySubject } from 'rxjs';
import { finalize, ignoreElements, map, switchMap, take, tap } from 'rxjs/operators';
import { API_INJECTION_TOKENS } from 'src/app/api/api-injection-tokens';
import { IEntityDataApiService } from 'src/app/api/entity.data-api.iservice';
import { DataPage } from 'src/models/DataPage';
import { Image } from 'src/models/entities/Image';

@Injectable()
export class ImagesArrayDialogService {

  private loadingSource = new BehaviorSubject(false);
  private pageSource = new ReplaySubject<DataPage<Image>>(1);
  private selectedImagesSource = new BehaviorSubject<Image[]>([]);

  loading$ = this.loadingSource.asObservable();
  page$ = this.pageSource.asObservable();
  selectedImages$ = this.selectedImagesSource.asObservable();

  pageIndex = 0;
  pageSize: number;
  sortBy: string;
  order: string;
  filter: string;

  constructor(
    @Inject(API_INJECTION_TOKENS.dataImages) private imageDataService: IEntityDataApiService<Image>
  ) { }

  /** Empty item selections and fetch data from the external service again. */
  reloadItems() {
    this.loadingSource.next(true);
    const apiFilters = this.filter ? { filenameLike: this.filter } : undefined;
    return this.imageDataService.fetchPage(this.pageIndex, this.pageSize, this.sortBy, this.order, apiFilters).pipe(
      tap(page => this.pageSource.next(page)),
      ignoreElements(),
      finalize(() => this.loadingSource.next(false))
    );
  }

  updateSelection(options: { selected?: Image[], unselected?: Image[] }) {
    return this.selectedImages$.pipe(
      take(1),
      map(selectedImages => {
        const productArraySet = new Set([...selectedImages, ...options.selected]);
        return [...productArraySet.values()];
      }),
      switchMap(selectedImages => from(options.unselected || []).pipe(
        tap(img => {
          const matchingIndex = selectedImages.findIndex(img2 => img.url === img2.url)
          if (matchingIndex !== -1) {
            selectedImages.splice(matchingIndex, 1);
          }
        }),
        ignoreElements(),
        finalize(() => this.selectedImagesSource.next(selectedImages))
      )),
    );
  }

}
