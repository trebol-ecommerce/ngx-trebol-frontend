/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, OnDestroy } from '@angular/core';
import {
  AbstractControl, ControlValueAccessor, FormBuilder, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR,
  ValidationErrors, Validator, Validators
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, concat, Observable, Subscription, throwError } from 'rxjs';
import { catchError, finalize, map, startWith, tap } from 'rxjs/operators';
import { isJavaScriptObject } from 'src/functions/isJavaScriptObject';
import { COMMON_DISMISS_BUTTON_LABEL } from 'src/text/messages';
import { ImageManagerUploadService } from './image-upload-form.service';

@Component({
  selector: 'app-image-upload-form',
  templateUrl: './image-upload-form.component.html',
  styleUrls: ['./image-upload-form.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: ImageUploadFormComponent
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: ImageUploadFormComponent
    }
  ]
})
export class ImageUploadFormComponent
  implements OnDestroy, ControlValueAccessor, Validator {

  private uploadSubscription: Subscription;
  private uploadingSource = new BehaviorSubject<boolean>(false);
  private uploadPercentageSource = new BehaviorSubject<number>(0);

  uploadQueueSize = 0;
  completedUploads = 0;
  get isSingleFile() { return (this.uploadQueueSize === 1); }

  uploading$ = this.uploadingSource.asObservable();
  uploadPercentage$ = this.uploadPercentageSource.asObservable();

  formGroup: FormGroup;
  get files() { return this.formGroup.get('files') as FormControl; }

  constructor(
    private dialog: MatDialogRef<ImageUploadFormComponent>,
    private formBuilder: FormBuilder,
    private uploadService: ImageManagerUploadService,
    private snackBarService: MatSnackBar
  ) {
    this.formGroup = this.formBuilder.group({
      files: [undefined, Validators.required]
    });
  }

  ngOnDestroy(): void {
    this.uploadingSource.complete();
    this.uploadPercentageSource.complete();
    this.uploadSubscription?.unsubscribe();
  }

  onChange(value: any): void { }
  onTouched(): void { }
  onValidatorChange(): void { }

  writeValue(obj: any): void {
    this.files.reset('', { emitEvent: false });
    if (isJavaScriptObject(obj)) {
      this.formGroup.patchValue(obj);
    }
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.formGroup.disable();
    } else {
      this.formGroup.enable();
    }
  }

  validate(control: AbstractControl): ValidationErrors | null {
    if (this.formGroup.valid) {
      return null;
    }

    const errors = {} as ValidationErrors;
    if (this.files.errors) {
      errors.imageUploadFiles = this.files.errors;
    }

    return errors;
  }

  registerOnValidatorChange(fn: () => void): void {
    this.onValidatorChange = fn;
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      this.formGroup.disable();
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

      this.uploadSubscription = uploads$.pipe(
        tap(percent => {
          if (percent === 0) {
            // TODO use plural expression
            const uploadStartMessage = $localize`:Label with total images to be uploaded being {{ totalImagesToUpload }}:Uploading ${ this.uploadQueueSize }:totalImagesToUpload: images`;
            this.snackBarService.open(uploadStartMessage);
          }
        }),
        catchError((error: { status?: number, error?: string }) => {
          if (error?.status && error.status === 400) {
            this.snackBarService.open(error.error, COMMON_DISMISS_BUTTON_LABEL);
          } else {
            console.error(error);
            const uploadErrorMessage = $localize`:Message of error during upload of images:Error during upload`;
            this.snackBarService.open(uploadErrorMessage, COMMON_DISMISS_BUTTON_LABEL);
            this.formGroup.enable();
          }
          return throwError(error);
        }),
        finalize(() => {
          setTimeout(() => { this.dialog.close(true); }, 1000);
          // TODO use plural expression
          const uploadFinalMessage = $localize`:Message of success during (and after) uploading {{ imagesUploadedSoFar }} images out of a total of {{ totalImagesToUpload }}:Succesfully uploaded ${this.completedUploads}:imagesUploadedSoFar: out of ${this.uploadQueueSize}:totalImagesToUpload: images`;
          this.snackBarService.open(uploadFinalMessage, COMMON_DISMISS_BUTTON_LABEL);
        })
      ).subscribe();
    }
  }

  private uploadOneByOne(fileList: FileList): Observable<void> {
    const fileCount = fileList.length;
    let uploads$ = this.uploadService.submit(fileList.item(0));
    if (fileCount > 1) {
      for (let fileIndex = 1; fileIndex < fileList.length; fileIndex++) {
        const file = fileList.item(fileIndex);
        uploads$ = concat(
          uploads$,
          this.uploadService.submit(file)
        );
      }
    }
    return uploads$.pipe(map(() => void 0));
  }
}
