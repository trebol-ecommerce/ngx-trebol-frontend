import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppUserService } from 'src/app/app-user.service';
import { PersonFormComponent } from 'src/app/shared/person-form/person-form.component';
import { Person } from 'src/data/models/entities/Person';
import { DATA_INJECTION_TOKENS } from 'src/data/services/data-injection-tokens';
import { EntityDataIService } from 'src/data/services/entity.data.iservice';

export const TIEMPO_CONFIRMACION_SALIR = 2000;

@Component({
  selector: 'app-edit-profile-form-dialog',
  templateUrl: './edit-profile-form-dialog.component.html',
  styleUrls: ['./edit-profile-form-dialog.component.css']
})
export class EditProfileFormDialogComponent
  implements OnInit, OnDestroy {

  protected cancelarSource: BehaviorSubject<boolean> = new BehaviorSubject(false);
  protected guardandoSource: Subject<boolean> = new BehaviorSubject(false);

  public cancelar$: Observable<boolean> = this.cancelarSource.asObservable();
  public colorBotonCancelar$: Observable<string> = this.cancelar$.pipe(map(c => (c ? 'warn' : 'default')));
  public guardando$: Observable<boolean> = this.guardandoSource.asObservable();

  @ViewChild('personForm', { static: true }) public personForm: PersonFormComponent;
  public invalid$: Observable<boolean>;

  constructor(
    @Inject(DATA_INJECTION_TOKENS.people) protected peopleDataService: EntityDataIService<Person>,
    protected appUserService: AppUserService,
    protected dialog: MatDialogRef<EditProfileFormDialogComponent>,
    protected snackBarService: MatSnackBar,
  ) {
  }

  ngOnInit(): void {
    const personaId = this.appUserService.getCurrentSession().user.person.id;
    this.peopleDataService.readById(personaId).subscribe(
      p => {
        this.personForm.person = p;
      }
    );

    this.invalid$ = this.personForm.formGroup.statusChanges.pipe(
      tap(status => console.log(status)),
      map(status => status !== 'VALID')
    );
  }

  ngOnDestroy(): void {
    this.cancelarSource.complete();
    this.guardandoSource.complete();
  }

  protected guardarDatos(perfil: Person): void {
    this.guardandoSource.next(true);
    const sessionProfile = this.appUserService.getCurrentSession().user.person;

    this.peopleDataService.update(perfil, sessionProfile.id).pipe(
      map(p => p.id)
    ).subscribe(
      (idUsuario: number) => {
        if (idUsuario) {
          this.snackBarService.open('Sus datos fueron registrados exitosamente');
        } else {
          this.snackBarService.open('Sus datos fueron actualizados exitosamente');
        }
        this.dialog.close(perfil);
      },
      err => {
        this.snackBarService.open('Error al guardar usuario.', 'OK', {duration: -1});
      }
    );
  }

  public onClickAceptar(): void {
    const datosUsuario = this.personForm.asPerson();
    if (!datosUsuario) {
      this.snackBarService.open('Hay campos sin rellenar', 'OK', { duration: -1 });
      return null;
    } else {
      this.guardarDatos(datosUsuario);
    }
  }

  public onClickCancelar(): void {
    if (!this.cancelarSource.getValue()) {
      this.cancelarSource.next(true);
      setTimeout(() => { this.cancelarSource.next(false); }, TIEMPO_CONFIRMACION_SALIR);
    } else {
      this.dialog.close(null);
    }
  }

}
