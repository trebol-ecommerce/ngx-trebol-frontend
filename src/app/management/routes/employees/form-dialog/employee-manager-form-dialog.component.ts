import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Employee } from 'src/app/data/models/entities/Employee';
import { Person } from 'src/app/data/models/entities/Person';
import { PersonFormComponent } from 'src/app/shared/person-form/person-form.component';
import { COMMON_WARNING_MESSAGE, UNKNOWN_ERROR_MESSAGE } from 'src/text/messages';
import { DataManagerFormComponent } from '../../data-manager-form.acomponent';
import { EmployeeManagerFormService } from './employee-manager-form.service';

export interface EmployeeManagementFormDialogData {
  employee: Employee;
}

@Component({
  providers: [ EmployeeManagerFormService ],
  selector: 'app-employee-manager-form-dialog',
  templateUrl: './employee-manager-form-dialog.component.html',
  styleUrls: [ './employee-manager-form-dialog.component.css' ]
})
export class EmployeeManagerFormDialogComponent
  extends DataManagerFormComponent<Employee>
  implements AfterViewInit {

  protected itemId: number;

  public saving$: Observable<boolean>;

  public formGroup: FormGroup;
  public get role(): FormControl { return this.formGroup.get('role') as FormControl; }
  @ViewChild('personForm', { static: true }) public personForm: PersonFormComponent;

  public get dialogTitle(): string { return ((this.data?.employee?.id) ? 'Actualizar datos de' : 'Nuevo') + ' Empleado'; };

  constructor(
    @Inject(MAT_DIALOG_DATA) protected data: EmployeeManagementFormDialogData,
    protected service: EmployeeManagerFormService,
    protected dialog: MatDialogRef<EmployeeManagerFormDialogComponent>,
    protected snackBarService: MatSnackBar,
    protected formBuilder: FormBuilder
  ) {
    super();
    this.formGroup = this.formBuilder.group({
      role: [null, Validators.required]
    });
  }

  protected load(e: Employee): void {
    this.itemId = e.id ? e.id : 0;

    this.personForm.person = (e.person) ? e.person : new Person();
  }

  ngAfterViewInit(): void {
    this.formGroup.addControl('person', this.personForm.formGroup);

    const item: Employee = (this.data?.employee) ? this.data.employee : new Employee();
    this.load(item);
  }

  public asItem(): Employee {
    if (this.formGroup.invalid) {
      return undefined;
    } else {
      return Object.assign<Employee, Partial<Employee>>(
        new Employee(),
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
