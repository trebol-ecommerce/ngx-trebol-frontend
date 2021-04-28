// Copyright (c) 2021 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, of, ReplaySubject } from 'rxjs';
import { concatMap as switchMap, map } from 'rxjs/operators';
import { Image } from 'src/app/models/entities/Image';
import { ImagesService } from 'src/app/shared/services/images.service';

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
}
