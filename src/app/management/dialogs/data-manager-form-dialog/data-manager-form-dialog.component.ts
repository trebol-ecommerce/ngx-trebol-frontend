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
import { UNKNOWN_ERROR_MESSAGE } from 'src/text/messages';
import { DataManagerFormDialogData } from './DataManagerFormDialogData';

@Component({
  selector: 'app-data-manager-form-dialog',
  templateUrl: './data-manager-form-dialog.component.html',
  styleUrls: [ './data-manager-form-dialog.component.css' ]
})
export class DataManagerFormDialogComponent<T>
  implements OnInit {

  private busySource = new BehaviorSubject(true);
  private service: ITransactionalEntityDataApiService<T>;
  private isNew = true;

  busy$ = this.busySource.asObservable();

  dialogTitle = 'Detalles del elemento';

  @ViewChild(FormGroupOwnerOutletDirective, { static: true }) formGroupOutlet: FormGroupOwnerOutletDirective;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DataManagerFormDialogData<T>,
    private dialog: MatDialogRef<DataManagerFormDialogComponent<T>>,
    private snackBarService: MatSnackBar
  ) {
    this.service = this.data.service;
    if (this.data.title) {
      this.dialogTitle = this.data.title;
    }
    if (this.data.successMessage) {
      this.successMessage = this.data.successMessage;
    }
  }

  ngOnInit(): void {
    if (this.data.item) {
      this.isNew = false;
    }

    this.busySource.next(false);
  }

  onSubmit(): void {
    const innerComponent = this.formGroupOutlet.innerComponent;
    if (innerComponent.formGroup.invalid) {
      innerComponent.onParentFormTouched();
      this.snackBarService.open('El formulario está incompleto o con errores. Revise la información ingresada e inténtelo nuevamente, por favor.', 'OK');
    } else {
      const item = this.data.item;
      const submitObservable = (this.isNew) ? this.service.create(item) : this.service.update(item);
      submitObservable.subscribe(
        success => {
          const message = this.successMessage(item);
          this.snackBarService.open(message, 'OK');
          this.dialog.close(item);
        },
        error => {
          this.snackBarService.open(UNKNOWN_ERROR_MESSAGE, 'OK');
        }
      );
    }
  }

  onCancel(): void {
    this.dialog.close();
  }

  private successMessage(item: T) {
    return 'Elemento guardado con éxito';
  }

}
