// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Salesperson } from 'src/app/models/entities/Salesperson';
import { COMMON_WARNING_MESSAGE, UNKNOWN_ERROR_MESSAGE } from 'src/text/messages';
import { DataManagerFormComponentDirective } from '../../data-manager-form.component-directive';
import { SalespersonManagerFormService } from './salesperson-manager-form.service';
import { DataManagerFormDialogData } from '../../DataManagerFormDialogData';

@Component({
  selector: 'app-salesperson-manager-form-dialog',
  templateUrl: './salesperson-manager-form-dialog.component.html',
  styleUrls: [ './salesperson-manager-form-dialog.component.css' ]
})
export class SalespersonManagerFormDialogComponent
  implements DataManagerFormComponentDirective<Salesperson> {

  public saving$: Observable<boolean>;

  formGroup: FormGroup;
  get person() { return this.formGroup.get('person') as FormControl; }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DataManagerFormDialogData<Salesperson>,
    public service: SalespersonManagerFormService,
    protected dialog: MatDialogRef<SalespersonManagerFormDialogComponent>,
    protected snackBarService: MatSnackBar,
    protected formBuilder: FormBuilder
  ) {
    this.formGroup = this.formBuilder.group({
      person: ['']
    });

    const item: Salesperson = (this.data?.item) ? this.data.item : new Salesperson();
    this.load(item);
  }

  load(e: Salesperson): void {
    this.person.setValue(e);
  }

  public onSubmit(): void {
    if (this.formGroup.valid) {
      const salesperson = this.formGroup.value as Salesperson;
      this.service.submit(salesperson).subscribe(
        success => {
          if (success) {
            this.snackBarService.open(`Vendedor/a ${salesperson.person.name} guardado/a exitosamente.`, 'OK');
            this.dialog.close(salesperson);
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

  public onCancel(): void {
    this.dialog.close();
  }

}
