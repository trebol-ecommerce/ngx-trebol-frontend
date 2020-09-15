import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { DataManagerFormComponent } from 'src/app/management/data-manager-form.acomponent';
import { PersonFormComponent } from 'src/shared/person-form/person-form.component';
import { Employee } from 'src/data/models/entities/Employee';
import { EmployeeRole } from 'src/data/models/entities/EmployeeRole';
import { Person } from 'src/data/models/entities/Person';
import { ERR_SRV_COMM_MSG } from 'src/text/messages';
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
  implements OnInit, AfterViewInit {

  protected itemId: number;

  public saving$: Observable<boolean>;

  public employeeRoles$: Observable<EmployeeRole[]>;

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

    if (e.role?.id) { this.role.setValue(e.role.id); }
    this.personForm.person = (e.person) ? e.person : new Person();
  }

  ngOnInit(): void {
    this.employeeRoles$ = this.service.getAllEmployeeRoles();
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
          role: { id: this.role.value },
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
              this.snackBarService.open('Empleado \'' + item.person.name + '\' actualizado/a exitosamente.');
            } else {
              this.snackBarService.open('Empleado \'' + item.person.name + '\' registrado/a exitosamente.');
            }
            this.dialog.close(item);
          } else {
            this.snackBarService.open(ERR_SRV_COMM_MSG, 'OK', { duration: -1 });
          }
        }
      );
    }
  }

  public onCancel(): void {
    this.dialog.close();
  }

}
