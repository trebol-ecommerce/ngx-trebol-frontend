/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectionListChange } from '@angular/material/list';
import { PageEvent } from '@angular/material/paginator';
import { merge, Observable, Subject, Subscription } from 'rxjs';
import { debounceTime, map, tap, throttleTime } from 'rxjs/operators';
import { Image } from 'src/models/entities/Image';
import { ImageArrayOption } from './ImageArrayOption';
import { ImagesArrayDialogService } from './images-array-dialog.service';
import { ImagesArrayDialogData } from './ImagesArrayDialogData';

@Component({
  selector: 'app-images-array-dialog',
  templateUrl: './images-array-dialog.component.html',
  styleUrls: ['./images-array-dialog.component.css'],
  providers: [ ImagesArrayDialogService ]
})
export class ImagesArrayDialogComponent
  implements OnInit, OnDestroy {

  private selectedImagesSub: Subscription;
  private selectionChangeSub: Subscription;
  private fetchingSubscription: Subscription;
  private filterChangesSub: Subscription;
  private filterChangeNotifier = new Subject<void>();

  selectedImages: Image[];
  filterFormControl = new UntypedFormControl();
  pageSizeOptions = [10, 20, 50];
  loading$: Observable<boolean>;
  options$: Observable<ImageArrayOption[]>;
  totalCount$: Observable<number>;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: ImagesArrayDialogData,
    private service: ImagesArrayDialogService
  ) { }

  ngOnInit(): void {
    if (this.data?.existing?.length > 0) {
      this.service.updateSelection({
        selected: this.data.existing,
        unselected: []
      });
    }
    this.selectedImagesSub = this.service.selectedImages$.pipe(
      tap(v => { this.selectedImages = v; })
    ).subscribe();
    this.filterChangesSub = merge(
      this.filterFormControl.valueChanges.pipe(
        throttleTime(500),
        tap(() => this.filterChangeNotifier.next())
      ),
      this.filterFormControl.valueChanges.pipe(
        debounceTime(500),
        tap((filter: string) => {
          this.service.filter = filter;
          this.service.pageIndex = 0;
          this.reload();
        })
      )
    ).subscribe();
    this.loading$ = merge(
      this.filterChangeNotifier.pipe(
        map(() => true)
      ),
      this.service.loading$.pipe()
    );
    this.options$ = this.service.page$.pipe(
      map(page => page.items.map(image => ({
        image,
        selected: this.selectedImages.some(img => (img.url === image.url)),
        disabled: false
      })))
    );
    this.totalCount$ = this.service.page$.pipe(
      map(page => page.totalCount)
    );
    this.service.pageSize = this.pageSizeOptions[0];
    this.reload();
  }

  ngOnDestroy(): void {
    this.selectedImagesSub.unsubscribe();
    this.filterChangesSub.unsubscribe();
    this.filterChangeNotifier.complete();
    this.selectionChangeSub?.unsubscribe();
    this.fetchingSubscription?.unsubscribe();
  }

  onSelectionChange(event: MatSelectionListChange) {
    this.selectionChangeSub?.unsubscribe();
    this.selectionChangeSub = this.service.updateSelection({
      selected: event.options.filter(o => o.selected)
        .map(o => o.value as Image),
      unselected: event.options.filter(o => !o.selected)
        .map(o => o.value as Image)
    }).subscribe();
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
