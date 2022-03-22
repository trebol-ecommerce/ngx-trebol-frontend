/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { COMMON_DISMISS_BUTTON_LABEL, COMMON_ERROR_MESSAGE, COMMON_VALIDATION_ERROR_MESSAGE } from 'src/text/messages';
import { EntityFormGroupFactoryService } from '../../../shared/entity-form-group-factory.service';
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
  implements OnInit {

  private busySource = new BehaviorSubject(false);

  busy$ = this.busySource.asObservable();
  dialogTitle = $localize`:Title of dialog used to view and edit some data:Element data`;
  formGroup: FormGroup;
  get innerFormGroup() { return this.formGroup?.get('item') as FormGroup; }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Partial<EntityFormDialogData<T>>,
    private formGroupService: EntityFormGroupFactoryService,
    private dialog: MatDialogRef<EntityFormDialogComponent<T>>,
    private snackBarService: MatSnackBar
  ) { }

  ngOnInit(): void {
    if (this.data.dialogTitle) {
      this.dialogTitle = this.data.dialogTitle;
    }
    if (this.data.successMessage) {
      this.successMessage = this.data.successMessage;
    }
    this.formGroup = this.setupFormGroup();
    if (this.data.item) {
      this.innerFormGroup.patchValue(this.data.item);
    }
  }

  onSubmit(): void {
    if (this.formGroup.invalid) {
      this.formGroup.markAsTouched();
      this.snackBarService.open(COMMON_VALIDATION_ERROR_MESSAGE, COMMON_DISMISS_BUTTON_LABEL);
    } else {
      const initialValue = this.data.item;
      const currentValue = this.formGroup.value.item;
      if (!this.data.apiService) {
        this.dialog.close(currentValue);
      } else {
        (
          (!initialValue) ?
            this.data.apiService.create(currentValue) :
            this.data.apiService.update(currentValue, initialValue)
        ).pipe(
          tap(() => {
            const message = this.successMessage(currentValue);
            this.snackBarService.open(message, COMMON_DISMISS_BUTTON_LABEL);
            this.dialog.close(currentValue);
          }),
          catchError(err => {
            this.snackBarService.open(COMMON_ERROR_MESSAGE, COMMON_DISMISS_BUTTON_LABEL);
            return throwError(err)
          })
        ).subscribe();
      }
    }
  }

  onCancel(): void {
    this.dialog.close();
  }

  private successMessage(item: T) {
    return $localize `:Message of success after saving some data:Data saved successfully`;
  }

  private setupFormGroup(): FormGroup | null {
    const innerFormGroup = this.formGroupService.createFormGroupFor(this.data.entityType);
    if (innerFormGroup != null) {
      return new FormGroup({ item: innerFormGroup });
    }
  }

}
