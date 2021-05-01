/**
 * Copyright (c) 2021 Benjamin La Madrid
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, of, ReplaySubject, iif } from 'rxjs';
import { concatMap as switchMap, map, share } from 'rxjs/operators';
import { Image } from 'src/app/models/entities/Image';
import { ImagesService } from 'src/app/shared/services/images.service';
import { ImageArrayOption } from './imageArrayOption';
import { ImagesArrayDialogData } from './ImagesArrayDialogData';

@Injectable({ providedIn: 'root' })
export class ImagesArrayService
  implements OnDestroy {

  private filterSource = new BehaviorSubject('');

  imageList$: Observable<Image[]>;

  set filter(value: string) {
    this.filterSource.next(value);
  }

  constructor(
    private imageDataService: ImagesService
  ) {
    this.imageList$ = this.filterCachedImages();
  }

  ngOnDestroy(): void {
    this.filterSource.complete();
  }

  fetchOptions(data?: ImagesArrayDialogData): Observable<ImageArrayOption[]> {
    return iif(
      () => (data?.existing?.length !== 0 &&
              data.existing.length > 0),
      this.convertImagesToOptionsAndProcessExistingFrom(data),
      this.convertImagesToOptions()
    ).pipe(
      share()
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

  private convertImagesToOptions(): Observable<ImageArrayOption[]> {
    return this.imageList$.pipe(
      map(imageList => imageList.map(
            image => ({ image, selected: false, disabled: false })
      ))
    );
  }

  private convertImagesToOptionsAndProcessExistingFrom(data: ImagesArrayDialogData): Observable<ImageArrayOption[]> {
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
