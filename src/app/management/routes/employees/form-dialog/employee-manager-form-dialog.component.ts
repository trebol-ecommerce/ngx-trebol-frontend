import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subject } from 'rxjs';
import { DataItemFormAbstractComponent } from 'src/app/management/data-item-form.abstract-component';
import { PersonFormComponent } from 'src/app/shared/person-form/person-form.component';
import { Employee } from 'src/data/models/entities/Employee';
import { EmployeeRole } from 'src/data/models/entities/EmployeeRole';
import { Person } from 'src/data/models/entities/Person';
import { DATA_INJECTION_TOKENS } from 'src/data/services/data-injection-tokens';
import { EntityDataIService } from 'src/data/services/entity.data.iservice';
import { SharedDataIService } from 'src/data/services/shared.data.iservice';
import { ERR_SRV_COMM_MSG } from 'src/text/messages';


export interface EmployeeManagementFormDialogData {
  employee: Employee;
}

@Component({
  selector: 'app-employee-manager-form-dialog',
  templateUrl: './employee-manager-form-dialog.component.html',
  styleUrls: [ './employee-manager-form-dialog.component.css' ]
})
export class EmployeeManagerFormDialogComponent extends DataItemFormAbstractComponent<Employee>
  implements OnInit, OnDestroy {

  protected itemId: number;
  protected savingSource: Subject<boolean> = new Subject();

  public saving$: Observable<boolean> = this.savingSource.asObservable();
  public employeeRoles$: Observable<EmployeeRole[]>;

  public formGroup: FormGroup;
  public get role(): FormControl { return this.formGroup.get('role') as FormControl; }
  @ViewChild('personForm', { static: true }) public personForm: PersonFormComponent;

  public dialogTitle: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) data: EmployeeManagementFormDialogData,
    @Inject(DATA_INJECTION_TOKENS.shared) protected sharedDataService: SharedDataIService,
    @Inject(DATA_INJECTION_TOKENS.employees) protected dataService: EntityDataIService<Employee>,
    protected dialog: MatDialogRef<EmployeeManagerFormDialogComponent>,
    protected snackBarService: MatSnackBar,
    protected formBuilder: FormBuilder
  ) {
    super();
    this.formGroup = this.formBuilder.group({
      role: [null, Validators.required],
      person: this.personForm.formGroup
    });

    const item: Employee = (data?.employee) ? data.employee : new Employee();
    this.load(item);
  }

  protected load(e: Employee): void {
    this.itemId = e.id ? e.id : 0;
    this.dialogTitle = ((this.itemId) ? 'Actualizar datos de' : 'Nuevo') + ' Empleado';

    if (e.role?.id) { this.role.setValue(e.role.id); }
    this.personForm.person = (e.person) ? e.person : new Person();
  }

  ngOnInit(): void {
    this.employeeRoles$ = this.sharedDataService.readAllEmployeeRoles();
  }

  ngOnDestroy(): void {
    this.savingSource.complete();
  }

  public asItem(): Employee {
    if (this.formGroup.invalid) {
      return undefined;
    } else {
      return Object.assign(new Employee(), {
        id: this.itemId,
        role: { id: this.role.value },
        person: this.personForm.asPerson()
      });
    }
  }

  public onSubmit(): void {
    const item = this.asItem();
    if (item) {
      this.savingSource.next(true);
      this.dataService.create(item).subscribe(
        (result: Employee) => {
          // TODO: make better logic
          if (result.id) {
            if (item.id) {
              this.snackBarService.open('Empleado \'' + result.person.name + '\' actualizado/a exitosamente.');
            } else {
              this.snackBarService.open('Empleado \'' + result.person.name + '\' registrado/a exitosamente.');
            }
            this.dialog.close(result);
          } else {
            this.snackBarService.open(ERR_SRV_COMM_MSG, 'OK', { duration: -1 });
            this.savingSource.next(false);
          }
        }, err => {
          this.snackBarService.open(ERR_SRV_COMM_MSG, 'OK', { duration: -1 });
          this.savingSource.next(false);
        }
      );
    }
  }

  public onCancel(): void {
    this.dialog.close();
  }

}
