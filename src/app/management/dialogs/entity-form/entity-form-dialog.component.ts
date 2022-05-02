/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { COMMON_DISMISS_BUTTON_LABEL, COMMON_ERROR_MESSAGE, COMMON_VALIDATION_ERROR_MESSAGE } from 'src/text/messages';
import { EntityFormDialogData } from './EntityFormDialogData';

/**
 * Component acting as a bridge between the MatDialog service and any
 * component that extends FormGroupOwnerOutlet
 */
@Component({
  selector: 'app-entity-form-dialog',
  templateUrl: './entity-form-dialog.component.html',
  styleUrls: [ './entity-form-dialog.component.css' ]
})
export class EntityFormDialogComponent<T>
  implements OnInit, OnDestroy {

  private formSubmissionSub: Subscription;
  private busySource = new BehaviorSubject(false);
  private successMessage: (item: T) => string;

  busy$ = this.busySource.asObservable();

  dialogTitle: string;

  formGroup: FormGroup;
  get item() { return this.formGroup?.get('item') as FormControl; }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Partial<EntityFormDialogData<T>>,
    private dialog: MatDialogRef<EntityFormDialogComponent<T>>,
    private snackBarService: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.dialogTitle = this.data.dialogTitle ?
      this.data.dialogTitle :
      $localize`:Title of dialog used to view and edit some data:Element data`;

    this.successMessage = this.data.successMessage ?
      this.data.successMessage :
      () => $localize`:Message of success after saving some data:Data saved successfully`;

    if (this.data.entityType) {
      this.formGroup = new FormGroup({
        item: new FormControl(this.data.item || null, Validators.required)
      });
    }
  }

  ngOnDestroy(): void {
    this.formSubmissionSub?.unsubscribe();
  }

  onSubmit(): void {
    if (this.formGroup.invalid) {
      this.formGroup.markAsTouched();
      this.snackBarService.open(COMMON_VALIDATION_ERROR_MESSAGE, COMMON_DISMISS_BUTTON_LABEL);
    } else {
      this.busySource.next(true);
      if (this.data.apiService) {
        this.formSubmissionSub?.unsubscribe();
        this.formSubmissionSub = this.doSubmit().subscribe();
      } else {
        this.dialog.close(this.item.value);
      }
    }
  }

  onCancel(): void {
    this.dialog.close();
  }

  private doSubmit() {
    return ((!this.data.isNewItem && this.data.item) ?
      this.data.apiService.update(this.item.value as T, this.data.item) :
      this.data.apiService.create(this.item.value as T)
    ).pipe(
      tap(
        () => {
          const message = this.successMessage(this.item.value);
          this.snackBarService.open(message, COMMON_DISMISS_BUTTON_LABEL);
          this.dialog.close();
        },
        err => {
          this.busySource.next(false);
          this.snackBarService.open(COMMON_ERROR_MESSAGE, COMMON_DISMISS_BUTTON_LABEL);
        }
      )
    );
  }

}
