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
import { Person } from 'src/app/models/entities/Person';
import { PersonFormComponent } from 'src/app/shared/person-form/person-form.component';
import { COMMON_WARNING_MESSAGE, UNKNOWN_ERROR_MESSAGE } from 'src/text/messages';
import { DataManagerFormComponentDirective } from '../../data-manager-form.component-directive';
import { SellerManagerFormService } from './seller-manager-form.service';

export interface SellerManagementFormDialogData {
  seller: Salesperson;
}

@Component({
  providers: [ SellerManagerFormService ],
  selector: 'app-seller-manager-form-dialog',
  templateUrl: './seller-manager-form-dialog.component.html',
  styleUrls: [ './seller-manager-form-dialog.component.css' ]
})
export class SellerManagerFormDialogComponent
  extends DataManagerFormComponentDirective<Salesperson>
  implements AfterViewInit {

  protected itemId: number;

  public saving$: Observable<boolean>;

  public formGroup: FormGroup;
  public get role(): FormControl { return this.formGroup.get('role') as FormControl; }
  @ViewChild('personForm', { static: true }) public personForm: PersonFormComponent;

  public get dialogTitle(): string { return ((this.data?.seller?.id) ? 'Actualizar datos de' : 'Nuevo') + ' Empleado'; }

  constructor(
    @Inject(MAT_DIALOG_DATA) protected data: SellerManagementFormDialogData,
    protected service: SellerManagerFormService,
    protected dialog: MatDialogRef<SellerManagerFormDialogComponent>,
    protected snackBarService: MatSnackBar,
    protected formBuilder: FormBuilder
  ) {
    super();
    this.formGroup = this.formBuilder.group({
      role: [null, Validators.required]
    });
  }

  protected load(e: Salesperson): void {
    this.itemId = e.id ? e.id : 0;

    this.personForm.person = (e.person) ? e.person : new Person();
  }

  ngAfterViewInit(): void {
    this.formGroup.addControl('person', this.personForm.formGroup);

    const item: Salesperson = (this.data?.seller) ? this.data.seller : new Salesperson();
    this.load(item);
  }

  public asItem(): Salesperson {
    if (this.formGroup.invalid) {
      return undefined;
    } else {
      return Object.assign<Salesperson, Partial<Salesperson>>(
        new Salesperson(),
        {
          id: this.itemId,
          person: this.personForm.asPerson()
        }
      );
    }
  }

  public onSubmit(): void {
    const item = this.asItem();
    if (item) {
      this.service.submit(item).subscribe(
        success => {
          if (success) {
            if (item.id) {
              this.snackBarService.open(`Empleado ${item.person.name} actualizado/a exitosamente.`, 'OK');
            } else {
              this.snackBarService.open(`Empleado ${item.person.name} registrado/a exitosamente.`, 'OK');
            }
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

  public onCancel(): void {
    this.dialog.close();
  }

}
