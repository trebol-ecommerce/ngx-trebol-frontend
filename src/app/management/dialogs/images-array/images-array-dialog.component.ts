/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectionListChange } from '@angular/material/list';
import { PageEvent } from '@angular/material/paginator';
import { from, merge, Observable, Subject, Subscription } from 'rxjs';
import { debounceTime, map, tap, throttleTime } from 'rxjs/operators';
import { Image } from 'src/models/entities/Image';
import { ImageArrayOption } from './ImageArrayOption';
import { ImagesArrayService } from './images-array.service';
import { ImagesArrayDialogData } from './ImagesArrayDialogData';

@Component({
  selector: 'app-images-array-dialog',
  templateUrl: './images-array-dialog.component.html',
  styleUrls: ['./images-array-dialog.component.css'],
  providers: [ ImagesArrayService ]
})
export class ImagesArrayDialogComponent
  implements OnInit, OnDestroy {

  private selectionChangeSub: Subscription;
  private fetchingSubscription: Subscription;
  private filterChangesSub: Subscription;
  private filterChangeNotifier = new Subject<void>();

  selectedImages: Image[] = [];
  filterFormControl = new FormControl();
  pageSizeOptions = [10, 20, 50];
  loading$: Observable<boolean>;
  options$: Observable<ImageArrayOption[]>;
  totalCount$: Observable<number>;

  constructor(
    @Inject(MAT_DIALOG_DATA) data: ImagesArrayDialogData,
    private service: ImagesArrayService
  ) {
    if (data?.existing?.length > 0) {
      this.selectedImages.push(...data.existing);
    }
  }

  ngOnInit(): void {
    this.loading$ = merge(
      this.filterChangeNotifier.pipe(map(() => true)),
      this.service.loading$.pipe()
    );
    this.options$ = this.service.imagesPage$.pipe(
      map(page => page.items.map(image => ({
        image,
        selected: this.selectedImages.some(img => img.url === image.url),
        disabled: false
      })))
    );
    this.totalCount$ = this.service.imagesPage$.pipe(map(page => page.totalCount));
    this.filterChangesSub = merge(
      this.filterFormControl.valueChanges.pipe(
        throttleTime(500),
        tap(() => this.filterChangeNotifier.next())
      ),
      this.filterFormControl.valueChanges.pipe(
        debounceTime(500),
        tap(filter => {
          this.service.filter = filter;
          this.service.pageIndex = 0;
          this.reload();
        })
      )
    ).subscribe();
    this.service.pageSize = this.pageSizeOptions[0];
    this.reload();
  }

  ngOnDestroy(): void {
    this.selectionChangeSub?.unsubscribe();
    this.fetchingSubscription?.unsubscribe();
    this.filterChangesSub.unsubscribe();
    this.filterChangeNotifier.complete();
  }

  onSelectionChange(event: MatSelectionListChange) {
    this.selectionChangeSub?.unsubscribe();
    this.selectionChangeSub = from(event.options).pipe(
      tap((option) => {
        const matchingSelectedImageIndex = this.selectedImages.findIndex(image => image.url === option.value.url);
        if (!option.selected && matchingSelectedImageIndex !== -1) {
          this.selectedImages.splice(matchingSelectedImageIndex, 1);
        } else if (option.selected && matchingSelectedImageIndex === -1) {
          this.selectedImages.push(option.value);
        }
      })
    ).subscribe();
  }

  onPage(event: PageEvent) {
    this.service.pageIndex = event.pageIndex;
    this.service.pageSize = event.pageSize;
    this.reload();
  }

  reload() {
    this.fetchingSubscription?.unsubscribe();
    this.fetchingSubscription = this.service.reloadItems().subscribe();
  }

}
