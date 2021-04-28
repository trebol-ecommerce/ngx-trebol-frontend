/**
 * Copyright (c) 2021 Benjamin La Madrid
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, OnDestroy, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSelectionList } from '@angular/material/list';
import { BehaviorSubject, ReplaySubject, Subscription, Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Image } from 'src/app/models/entities/Image';
import { ImagesArrayService } from './images-array.service';

@Component({
  selector: 'app-images-array-dialog',
  templateUrl: './images-array-dialog.component.html',
  styleUrls: ['./images-array-dialog.component.css']
})
export class ImagesArrayDialogComponent
  implements OnDestroy {

  private selectedImages: Image[] = [];
  private selectedImagesSource = new BehaviorSubject<Image[]>(null);
  private focusImageSource = new BehaviorSubject<Image | null>(null);
  private filterChangeSub: Subscription;

  selectedImages$ = this.selectedImagesSource.asObservable();
  focusImage$ = this.focusImageSource.asObservable();
  filterFormControl = new FormControl();
  images$: Observable<Image[]>;

  @ViewChild('imageSelectionList', { static: true }) imageSelectionList: MatSelectionList;

  constructor(
    private dialog: MatDialogRef<ImagesArrayDialogComponent>,
    private service: ImagesArrayService
  ) {
    this.images$ = this.service.imageList$.pipe();
    this.filterChangeSub = this.filterFormControl.valueChanges.pipe(
      debounceTime(500)
    ).subscribe(
      filter => {
        this.service.filter = filter;
      }
    );
  }

  ngOnDestroy(): void {
    this.filterChangeSub.unsubscribe();
  }

  includeImage(img: Image): void {
    this.selectedImages.push(img);
    this.selectedImagesSource.next(this.selectedImages);
  }

  excludeImage(img: Image): void {
    const index = this.selectedImages.findIndex(img2 => img.filename === img2.filename)
    this.selectedImages.splice(index, 1);
    this.selectedImagesSource.next(this.selectedImages);
  }

  onClickAccept(): void {
    this.dialog.close(this.selectedImages);
  }

}
