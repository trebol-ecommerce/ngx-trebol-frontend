/**
 * Copyright (c) 2021 Benjamin La Madrid
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, OnDestroy, ViewChild, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectionList } from '@angular/material/list';
import { Subscription, Observable, iif } from 'rxjs';
import { debounceTime, map, tap, share } from 'rxjs/operators';
import { Image } from 'src/app/models/entities/Image';
import { ImagesArrayService } from './images-array.service';
import { ImageArrayOption } from './imageArrayOption'
import { ImagesArrayDialogData } from './ImagesArrayDialogData';

@Component({
  selector: 'app-images-array-dialog',
  templateUrl: './images-array-dialog.component.html',
  styleUrls: ['./images-array-dialog.component.css']
})
export class ImagesArrayDialogComponent
  implements OnDestroy {

  private filterChangeSub: Subscription;

  filterFormControl = new FormControl();
  options$: Observable<ImageArrayOption[]>;

  @ViewChild('imageSelectionList', { static: true }) imageSelectionList: MatSelectionList;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: ImagesArrayDialogData,
    private dialog: MatDialogRef<ImagesArrayDialogComponent>,
    private service: ImagesArrayService
  ) {
    this.options$ = data ? this.service.fetchOptions(data) :
                            this.service.fetchOptions();
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

  onClickAccept(): void {
    const selectedUrls: Image[] = this.imageSelectionList.selectedOptions
      .selected
      .map((option) => Object.assign(
        new Image(), {
          url: option.value,
          filename: option.getLabel()
        }
      ));
    this.dialog.close(selectedUrls);
  }

}
