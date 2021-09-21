/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, OnDestroy, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, NG_VALUE_ACCESSOR, NG_VALIDATORS,
  ControlValueAccessor, Validator, AbstractControl, ValidationErrors
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, concat, Observable, Subscription, merge } from 'rxjs';
import { map, startWith, mapTo, debounceTime, tap } from 'rxjs/operators';
import { ImageManagerUploadService } from './image-upload-form.service';
import { collectValidationErrors } from 'src/functions/collectionValidationErrors';
import { isJavaScriptObject } from 'src/functions/isJavaScriptObject';
import { FormGroupOwner } from 'src/app/models/FormGroupOwner';

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

  validate(control: AbstractControl): ValidationErrors {
    return collectValidationErrors(control);
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
          setTimeout(() => { this.dialog.close(true); }, 1000);
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