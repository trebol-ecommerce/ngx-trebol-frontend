// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Component, Inject, ViewChild, ComponentFactoryResolver, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
import { ITransactionalEntityDataApiService } from 'src/app/api/transactional-entity.data-api.iservice';
import { COMMON_WARNING_MESSAGE, UNKNOWN_ERROR_MESSAGE } from 'src/text/messages';
import { DataManagerFormDialogData } from './DataManagerFormDialogData';
import { take, tap, debounceTime } from 'rxjs/operators';

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

  formGroup: FormGroup;
  get item() { return this.formGroup.get('item') as FormControl; }

  dialogTitle = 'Detalles del elemento';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DataManagerFormDialogData<T>,
    private dialog: MatDialogRef<DataManagerFormDialogComponent<T>>,
    private snackBarService: MatSnackBar,
    private formBuilder: FormBuilder
  ) {
    this.formGroup = this.formBuilder.group({
      item: [null]
    });
    this.service = this.data.service;
    if (this.data.title) {
      this.dialogTitle = this.data.title;
    }
  }

  ngOnInit(): void {
    if (this.data.item) {
      this.isNew = false;
      this.item.patchValue(this.data.item);
      this.item.valueChanges.pipe(debounceTime(200), take(10), tap(() => { console.log(this.item.valid); })).subscribe();
    }

    this.busySource.next(false);
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      console.log(this.item.errors);

      const item = this.item.value as T;
      console.log(item);
      if (this.isNew) {
        this.service.create(item).subscribe(
          success => {
            if (success) {
              let message: string;
              if (this.data.successMessage) {
                message = this.data.successMessage(item);
              } else {
                message = 'Elemento guardado con éxito';
              }
              this.snackBarService.open(message, 'OK');
              this.dialog.close(item);
            } else {
              this.snackBarService.open(COMMON_WARNING_MESSAGE, 'OK');
            }
          },
          error => {
            this.snackBarService.open(UNKNOWN_ERROR_MESSAGE, 'OK');
          }
        );
      }
    }
  }

  onCancel(): void {
    this.dialog.close();
  }

}
