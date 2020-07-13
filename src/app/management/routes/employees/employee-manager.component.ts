import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Employee } from 'src/data/models/entities/Employee';
import { ERR_SRV_COMM_MSG } from 'src/text/messages';
import { DataManagerAbstractComponent } from '../../data-manager.abstract-component';
import { EmployeeManagerService } from './employee-manager.service';
import { EmployeeManagementFormDialogData, EmployeeManagerFormDialogComponent } from './form-dialog/employee-manager-form-dialog.component';

@Component({
  selector: 'app-employee-manager',
  templateUrl: './employee-manager.component.html',
  styleUrls: []
})
export class EmployeeManagerComponent
  extends DataManagerAbstractComponent<Employee> {

  public tableColumns: string[] = [ 'nombre', 'rut', 'acciones' ];

  constructor(
    protected service: EmployeeManagerService,
    protected dialogService: MatDialog,
    protected snackBarService: MatSnackBar
  ) {
    super();
  }

  public openFormDialog(item: Employee): Observable<Employee> {
    const dialogData: EmployeeManagementFormDialogData = {
      employee: item
    };

    return this.dialogService.open(
      EmployeeManagerFormDialogComponent,
      {
        width: '40rem',
        data: dialogData
      }
    ).afterClosed();
  }

  public onClickDelete(e: Employee) {
    this.service.removeItems([e]).pipe(r => r[0]).subscribe(
      (success: boolean) => {
        if (success) {
          this.snackBarService.open('Empleado \'' + e.person.name + '\' eliminado.');
          this.service.reloadItems();
        } else {
          this.snackBarService.open(ERR_SRV_COMM_MSG, 'OK', { duration: -1 });
        }
      },
      () => {
        this.snackBarService.open(ERR_SRV_COMM_MSG, 'OK', { duration: -1 });
       }
    );
  }

}
