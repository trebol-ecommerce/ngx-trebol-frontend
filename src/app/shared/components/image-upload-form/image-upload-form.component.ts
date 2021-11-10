/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, EventEmitter, OnDestroy } from '@angular/core';
import {
  AbstractControl, ControlValueAccessor, FormBuilder, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR,
  ValidationErrors, Validator, Validators
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, concat, merge, Observable, Subscription } from 'rxjs';
import { debounceTime, map, mapTo, startWith, tap } from 'rxjs/operators';
import { FormGroupOwner } from 'src/app/models/FormGroupOwner';
import { collectValidationErrors } from 'src/functions/collectionValidationErrors';
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
  implements OnDestroy, ControlValueAccessor, Validator, FormGroupOwner {

  private uploadingSource = new BehaviorSubject<boolean>(false);
  private uploadSubscription: Subscription | undefined;
  private uploadPercentageSource = new BehaviorSubject<number>(0);
  private touchedSubscriptions: Subscription[] = [];
  private valueChangesSubscriptions: Subscription[] = [];
  private touched = new EventEmitter<void>();

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
    private storeService: ImageManagerUploadService,
    private snackBarService: MatSnackBar
  ) {
    this.formGroup = this.formBuilder.group({
      files: [undefined, Validators.required]
    });
  }

  ngOnDestroy(): void {
    this.uploadingSource.complete();
    this.uploadPercentageSource.complete();
    if (this.uploadSubscription) { this.uploadSubscription.unsubscribe(); }

    for (const sub of [
      ...this.valueChangesSubscriptions,
      ...this.touchedSubscriptions]) {
      sub.unsubscribe();
    }
  }

  writeValue(obj: any): void {
    this.files.reset('', { emitEvent: false });
    if (isJavaScriptObject(obj)) {
      this.formGroup.patchValue(obj);
    }
  }

  registerOnChange(fn: (value: any) => void): void {
    const sub = this.formGroup.valueChanges.pipe(debounceTime(250), tap(fn)).subscribe();
    this.valueChangesSubscriptions.push(sub);
  }

  registerOnTouched(fn: () => void): void {
    const sub = merge(this.touched).pipe(tap(fn)).subscribe();
    this.touchedSubscriptions.push(sub);
  }

  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.formGroup.disable({ emitEvent: false });
    } else {
      this.formGroup.enable({ emitEvent: false });
    }
  }

  validate(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) {
      return { required: value };
    } else {
      const errors = {} as any;
      if (!value.files) {
        errors.requiredImageUploadFiles = value.files;
      }
      if (!value.files.length) {
        errors.imageUploadFilesAmountMustBePositive = value.files;
      }

      if (JSON.stringify(errors) !== '{}') {
        return errors;
      }
    }
  }

  onParentFormTouched(): void {
    this.formGroup.markAllAsTouched();
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
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
            // TODO use plural expression
            const uploadStartMessage = $localize`:Label with total images to be uploaded being {{ totalImagesToUpload }}:Subiendo ${ this.uploadQueueSize }:totalImagesToUpload: imágenes`;
            this.snackBarService.open(uploadStartMessage);
          }
        },
        (error: { status?: number, error?: string }) => {
          if (error?.status && error.status === 400) {
            this.snackBarService.open(error.error, COMMON_DISMISS_BUTTON_LABEL);
          } else {
            console.error(error);
            const uploadErrorMessage = $localize`:Message of error during upload of images:Error al intentar subir`;
            this.snackBarService.open(uploadErrorMessage, COMMON_DISMISS_BUTTON_LABEL);
          }
        },
        () => {
          setTimeout(() => { this.dialog.close(true); }, 1000);
          // TODO use plural expression
          const uploadFinalMessage = $localize`:Message of success during (and after) uploading {{ imagesUploadedSoFar }} images out of a total of {{ totalImagesToUpload }}:Se han subido ${this.completedUploads}:imagesUploadedSoFar: de ${this.uploadQueueSize}:totalImagesToUpload: imágenes exitosamente`;
          this.snackBarService.open(uploadFinalMessage, COMMON_DISMISS_BUTTON_LABEL);
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
