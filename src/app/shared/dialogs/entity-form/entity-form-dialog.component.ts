/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
import { ITransactionalEntityDataApiService } from 'src/app/api/transactional-entity.data-api.iservice';
import { FormGroupOwnerOutletDirective } from 'src/app/shared/directives/form-group-owner-outlet/form-group-owner-outlet.directive';
import { COMMON_VALIDATION_ERROR_MESSAGE, COMMON_DISMISS_BUTTON_LABEL, COMMON_ERROR_MESSAGE } from 'src/text/messages';
import { EntityFormDialogData } from './EntityFormDialogData';

@Component({
  selector: 'app-entity-form-dialog',
  templateUrl: './entity-form-dialog.component.html',
  styleUrls: [ './entity-form-dialog.component.css' ]
})
export class EntityFormDialogComponent<T>
  implements OnInit {

  private busySource = new BehaviorSubject(true);
  private service: ITransactionalEntityDataApiService<T>;
  private itemCopy = null;

  busy$ = this.busySource.asObservable();

  dialogTitle = $localize `:Title of dialog used to view and edit some data:Element data`;

  @ViewChild(FormGroupOwnerOutletDirective, { static: true }) formGroupOutlet: FormGroupOwnerOutletDirective;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Partial<EntityFormDialogData<T>>,
    private dialog: MatDialogRef<EntityFormDialogComponent<T>>,
    private snackBarService: MatSnackBar
  ) {
    if (this.data.service) {
      this.service = this.data.service;
    }
    if (this.data.title) {
      this.dialogTitle = this.data.title;
    }
    if (this.data.successMessage) {
      this.successMessage = this.data.successMessage;
    }
  }

  ngOnInit(): void {
    if (this.data.item) {
      this.itemCopy = Object.assign({}, this.data.item);
    }

    this.busySource.next(false);
  }

  onSubmit(): void {
    const innerComponent = this.formGroupOutlet.innerComponent;
    if (innerComponent.formGroup.invalid) {
      innerComponent.onParentFormTouched();
      this.snackBarService.open(COMMON_VALIDATION_ERROR_MESSAGE, COMMON_DISMISS_BUTTON_LABEL);
    } else {
      const item = this.data.item;
      if (!this.service) {
        this.dialog.close(item);
      } else {
        const submitObservable = (!this.itemCopy) ? this.service.create(item) : this.service.update(item, this.itemCopy);
        submitObservable.subscribe(
          success => {
            const message = this.successMessage(item);
            this.snackBarService.open(message, COMMON_DISMISS_BUTTON_LABEL);
            this.dialog.close(item);
          },
          error => {
            console.error(error);
            this.snackBarService.open(COMMON_ERROR_MESSAGE, COMMON_DISMISS_BUTTON_LABEL);
          }
        );
      }
    }
  }

  onCancel(): void {
    this.dialog.close();
  }

  private successMessage(item: T) {
    return $localize `:Message of success after saving some data:Data saved successfully`;
  }

}