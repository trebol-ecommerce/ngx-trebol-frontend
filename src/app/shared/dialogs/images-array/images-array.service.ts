/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, iif, Observable } from 'rxjs';
import { concatMap as switchMap, map } from 'rxjs/operators';
import { Image } from 'src/app/models/entities/Image';
import { ImagesService } from 'src/app/shared/services/images.service';
import { ImageArrayOption } from './ImageArrayOption';
import { ImagesArrayDialogData } from './ImagesArrayDialogData';

@Injectable({ providedIn: 'root' })
export class ImagesArrayService
  implements OnDestroy {

  private filterSource = new BehaviorSubject<string>('');
  private dialogDataSource = new BehaviorSubject<ImagesArrayDialogData>(undefined);

  imageList$: Observable<Image[]>;
  imageOptions$: Observable<ImageArrayOption[]>;

  set filter(value: string) {
    this.filterSource.next(value);
  }

  constructor(
    private imageDataService: ImagesService
  ) {
    this.imageList$ = this.filterCachedImages();
    this.imageOptions$ = this.dialogDataSource.asObservable().pipe(
      switchMap(data => this.imageOptionsObservable(data))
    );
  }

  ngOnDestroy(): void {
    this.filterSource.complete();
    this.dialogDataSource.complete();
  }

  triggerOptionsFetch(data?: ImagesArrayDialogData): void {
    if (data) {
      this.dialogDataSource.next(data);
    } else {
      this.dialogDataSource.next(null);
    }
  }

  private imageOptionsObservable(data: ImagesArrayDialogData): Observable<ImageArrayOption[]> {
    return iif(
      () => (data?.existing?.length !== 0 &&
        data?.existing?.length > 0),
      this.fetchImageOptionsAndProcessExisting(data),
      this.fetchImageOptions()
    );
  }

  private filterCachedImages(): Observable<Image[]> {
    return this.filterSource.asObservable().pipe(
      switchMap(filter => {
        if (filter) {
          const filterRegex = new RegExp(filter);
          return this.imageDataService.images$.pipe(
            map(images => images.filter(
              img => filterRegex.test(img.filename)
            ))
          );
        }
        return this.imageDataService.images$;
      })
    );
  }

  private fetchImageOptions(): Observable<ImageArrayOption[]> {
    return this.imageList$.pipe(
      map(imageList => imageList.map(
            image => ({ image, selected: false, disabled: false })
      ))
    );
  }

  private fetchImageOptionsAndProcessExisting(data: ImagesArrayDialogData): Observable<ImageArrayOption[]> {
    return this.imageList$.pipe(
      map(imageList => imageList.map(
            image => {
              const option = { image, selected: false, disabled: false };
              if (data.existing.some(image2 =>
                                          (image2.filename === image.filename))) {
                option.selected = true;
                option.disabled = true;
              }
              return option;
            }
      ))
    );
  }
}
