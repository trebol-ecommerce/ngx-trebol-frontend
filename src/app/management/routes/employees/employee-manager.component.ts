import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Employee } from 'src/app/data/models/entities/Employee';
import { COMMON_WARNING_MESSAGE, UNKNOWN_ERROR_MESSAGE } from 'src/text/messages';
import { DataManagerComponent } from '../data-manager.acomponent';
import { EmployeeManagerService } from './employee-manager.service';
import { EmployeeManagementFormDialogData, EmployeeManagerFormDialogComponent } from './form-dialog/employee-manager-form-dialog.component';

@Component({
  selector: 'app-employee-manager',
  templateUrl: './employee-manager.component.html',
  styleUrls: [
    '../data-manager.styles.css',
    './employee-manager.component.css'
  ]
})
export class EmployeeManagerComponent
  extends DataManagerComponent<Employee> {

  public tableColumns: string[] = [ 'name', 'idCard', 'actions' ];

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
    this.service.removeItems([e]).pipe(
      map(results => results[0])
    ).subscribe(
      success => {
        if (success) {
          this.snackBarService.open(`Empleado ${e.person.name} eliminado.`, 'OK');
          this.service.reloadItems();
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
