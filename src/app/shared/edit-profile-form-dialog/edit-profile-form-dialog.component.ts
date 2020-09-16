import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { map, tap, startWith } from 'rxjs/operators';
import { PersonFormComponent } from 'src/app/shared/person-form/person-form.component';
import { EditProfileFormService } from './edit-profile-form.service';

export const TIEMPO_CONFIRMACION_SALIR = 2000;

@Component({
  providers: [ EditProfileFormService ],
  selector: 'app-edit-profile-form-dialog',
  templateUrl: './edit-profile-form-dialog.component.html',
  styleUrls: ['./edit-profile-form-dialog.component.css']
})
export class EditProfileFormDialogComponent
  implements OnInit {

  protected confirmCancel: boolean;

  public saving$: Observable<boolean>;
  public cancelButtonColor$: Observable<string>;

  @ViewChild('personForm', { static: true }) public personForm: PersonFormComponent;

  public invalid$: Observable<boolean>;

  constructor(
    protected service: EditProfileFormService,
    protected dialog: MatDialogRef<EditProfileFormDialogComponent>,
    protected snackBarService: MatSnackBar,
  ) {
    this.saving$ = this.service.saving$.pipe();
    this.cancelButtonColor$ = this.service.confirmCancel$.pipe(
      tap(c => { this.confirmCancel = c; }),
      map(c => (c ? 'warn' : 'default'))
    );
  }

  ngOnInit(): void {
    this.service.loadProfile().subscribe(
      p => {
        this.personForm.person = p;
      }
    );

    this.invalid$ = this.personForm.formGroup.statusChanges.pipe(
      map(status => status !== 'VALID'),
      startWith(true)
    );
  }

  public onSubmit(): void {
    const datosUsuario = this.personForm.asPerson();
    if (datosUsuario) {
      this.service.saveProfile(datosUsuario).subscribe(
        success => {
          if (success) {
            this.snackBarService.open('Sus datos fueron registrados exitosamente');
            this.dialog.close();
          } else {
            this.snackBarService.open('Hubo un error al guardar sus datos. Por favor, inténtelo nuevamente.', 'OK', {duration: -1});
          }
        }
      );
    }
  }

  public onCancel(): void {
    if (!this.confirmCancel) {
      this.service.confirmCancel();
    } else {
      this.dialog.close();
    }
  }

}
