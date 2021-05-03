/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, concat, Observable, Subscription } from 'rxjs';
import { map, startWith, mapTo } from 'rxjs/operators';
import { ImageManagerUploadService } from './image-manager-upload.service';

@Component({
  providers: [ ImageManagerUploadService ],
  selector: 'app-image-manager-upload-dialog',
  templateUrl: './image-manager-upload-dialog.component.html',
  styleUrls: ['./image-manager-upload-dialog.component.css']
})
export class ImageManagerUploadDialogComponent
  implements OnDestroy {

  private uploadingSource = new BehaviorSubject<boolean>(false);
  private uploadSubscription: Subscription | undefined;
  private uploadPercentageSource = new BehaviorSubject<number>(0);

  uploadQueueSize = 0;
  completedUploads = 0;
  get isSingleFile(): boolean { return (this.uploadQueueSize === 1); }

  uploading$ = this.uploadingSource.asObservable();
  uploadPercentage$ = this.uploadPercentageSource.asObservable();
  uploadImageFormGroup: FormGroup;

  get files(): FormControl { return this.uploadImageFormGroup.get('files') as FormControl; }

  constructor(
    private dialog: MatDialogRef<ImageManagerUploadDialogComponent>,
    private formBuilder: FormBuilder,
    private storeService: ImageManagerUploadService,
    private snackBarService: MatSnackBar
  ) {
    this.uploadImageFormGroup = this.formBuilder.group({
      files: [undefined, Validators.required]
    });
  }

  ngOnDestroy(): void {
    this.uploadingSource.complete();
    this.uploadPercentageSource.complete();
    if (this.uploadSubscription) { this.uploadSubscription.unsubscribe(); }
  }

  onSubmit(): void {
    if (this.uploadImageFormGroup.valid) {
      this.uploadPercentageSource.next(0);
      this.uploadingSource.next(true);
      const fileList = (this.files.value as FileList);
      this.uploadQueueSize = fileList.length;

      const uploads$ = this.uploadOneByOne(fileList).pipe(
        map(() => {
          this.completedUploads++;
          const percent = Math.ceil((100 / this.uploadQueueSize) * this.completedUploads);
          this.uploadPercentageSource.next(percent);
          return percent;
        }),
        startWith(0)
      );

      this.uploadSubscription = uploads$.subscribe(
        percent => {
          if (percent === 0) {
            const imagen = `Im${this.isSingleFile ? 'a' : 'á'}gen${this.isSingleFile ? '' : 'es'}`;
            this.snackBarService.open(`Subiendo ${this.uploadQueueSize} ${imagen}`);
          }
        },
        (error: { status?: number, error?: string }) => {
          if (error?.status && error.status === 400) {
            this.snackBarService.open(error.error, 'OK');
          } else {
            console.error(error);
            this.snackBarService.open('Error al intentar subir', 'OK');
          }
        },
        () => {
          setTimeout(() => { this.dialog.close(); }, 1000);
          this.snackBarService.open(`${this.completedUploads} de ${this.uploadQueueSize} imágenes subidas exitosamente`, 'OK');
        }
      );
    }
  }

  private uploadOneByOne(fileList: FileList): Observable<void> {
    const fileCount = fileList.length;
    let uploads$ = this.storeService.submit(fileList.item(0));
    if (fileCount > 1) {
      for (let fileIndex = 1; fileIndex < fileList.length; fileIndex++) {
        const file = fileList.item(fileIndex);
        uploads$ = concat(
          uploads$,
          this.storeService.submit(file)
        );
      }
    }
    return uploads$.pipe(mapTo(void 0));
  }
}
