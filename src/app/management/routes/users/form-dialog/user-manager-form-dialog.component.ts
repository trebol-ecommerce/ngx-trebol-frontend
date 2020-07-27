import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subject } from 'rxjs';
import { DataItemFormAbstractComponent } from 'src/app/management/data-item-form.abstract-component';
import { Person } from 'src/data/models/entities/Person';
import { User } from 'src/data/models/entities/User';
import { DATA_INJECTION_TOKENS } from 'src/data/services/data-injection-tokens';
import { EntityDataIService } from 'src/data/services/entity.data.iservice';
import { SharedDataIService } from 'src/data/services/shared.data.iservice';
import { ERR_SRV_COMM_MSG } from 'src/text/messages';

export interface UserManagerFormDialogData {
  usuario: User;
}

@Component({
  selector: 'app-user-manager-form-dialog',
  templateUrl: './user-manager-form-dialog.component.html',
  styleUrls: [ './user-manager-form-dialog.component.css' ]
})
export class UserManagerFormDialogComponent
  extends DataItemFormAbstractComponent<User>
  implements OnInit {

  protected itemId: number;
  protected savingSource: Subject<boolean> = new Subject();

  public saving$: Observable<boolean> = this.savingSource.asObservable();
  public people$: Observable<Person[]>;

  public formGroup: FormGroup;
  public get name(): FormControl { return this.formGroup.get('name') as FormControl; }
  public get password(): FormControl { return this.formGroup.get('password') as FormControl; }
  public get person(): FormControl { return this.formGroup.get('person') as FormControl; }

  public dialogTitle: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) data: UserManagerFormDialogData,
    @Inject(DATA_INJECTION_TOKENS.shared) protected sharedDataService: SharedDataIService,
    @Inject(DATA_INJECTION_TOKENS.people) protected peopleDataService: EntityDataIService<Person>,
    @Inject(DATA_INJECTION_TOKENS.users) protected dataService: EntityDataIService<User>,
    protected dialog: MatDialogRef<UserManagerFormDialogComponent>,
    protected snackBarService: MatSnackBar,
    protected formBuilder: FormBuilder
  ) {
    super();
    this.formGroup = this.formBuilder.group({
      name: ['', Validators.required],
      password: [''],
      person: [undefined, Validators.required]
    });

    const item: User = (data?.usuario) ? data.usuario : new User();
    this.load(item);
  }

  protected load(u: User): void {
    this.itemId = u.id ? u.id : 0;
    this.dialogTitle = ((this.itemId) ? 'Actualizar datos de' : 'Nuevo') + ' Usuario';
    if (this.itemId) { this.password.setValidators(null); }

    this.name.setValue(u.name, { emitEvent: false, onlySelf: true });
    if (u.person?.id) {
      this.person.setValue(u.person.id, { emitEvent: false, onlySelf: true });
    }
  }

  ngOnInit(): void {
    this.people$ = this.peopleDataService.readAll();

  }

  public asItem(): User {
    if (this.formGroup.invalid) {
      return undefined;
    } else {
      return Object.assign<User, Partial<User>>(
        new User(),
        {
          id: this.itemId,
          name: this.name.value,
          password: this.password.value,
          person: { id: this.person.value }
        }
      );
    }
  }

  public onSubmit(): void {
    const item = this.asItem();
    if (item) {
      this.savingSource.next(true);
      this.dataService.create(item).subscribe(
        (result: User) => {
          // TODO: make sure prod2 is not actually prod
          if (result.id) {
            if (item.id) {
              this.snackBarService.open('Usuario \'' + item.name + '\' actualizado/a exitosamente.');
            } else {
              this.snackBarService.open('Usuario \'' + result.name + '\' registrado/a exitosamente.');
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
