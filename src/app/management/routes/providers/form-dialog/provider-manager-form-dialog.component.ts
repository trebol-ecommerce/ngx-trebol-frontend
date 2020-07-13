import { Component, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subject } from 'rxjs';
import { DataItemFormAbstractComponent } from 'src/app/management/data-item-form.abstract-component';
import { PersonFormComponent } from 'src/app/shared/person-form/person-form.component';
import { Person } from 'src/data/models/entities/Person';
import { Provider } from 'src/data/models/entities/Provider';
import { DATA_INJECTION_TOKENS } from 'src/data/services/data-injection-tokens';
import { EntityDataIService } from 'src/data/services/entity.data.iservice';
import { SharedDataIService } from 'src/data/services/shared.data.iservice';
import { ERR_SRV_COMM_MSG } from 'src/text/messages';

export interface ProviderManagerFormDialogData {
  provider: Provider;
}

@Component({
  selector: 'app-provider-manager-form-dialog',
  templateUrl: './provider-manager-form-dialog.component.html',
  styleUrls: [ './provider-manager-form-dialog.component.css' ]
})
export class ProviderManagerFormDialogComponent
  extends DataItemFormAbstractComponent<Provider> {

  protected itemId: number;
  protected savingSource: Subject<boolean> = new Subject();

  public saving$: Observable<boolean> = this.savingSource.asObservable();

  public formGroup: FormGroup;
  public get businessCard(): FormControl { return this.formGroup.get('businessCard') as FormControl; }
  @ViewChild('personForm', { static: true }) public personForm: PersonFormComponent;

  public dialogTitle: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) data: ProviderManagerFormDialogData,
    @Inject(DATA_INJECTION_TOKENS.providers) protected dataService: EntityDataIService<Provider>,
    @Inject(DATA_INJECTION_TOKENS.shared) protected sharedDataService: SharedDataIService,
    protected dialog: MatDialogRef<ProviderManagerFormDialogComponent>,
    protected snackBarService: MatSnackBar,
    protected formBuilder: FormBuilder
  ) {
    super();
    this.formGroup = this.formBuilder.group({
      businessCard: ['', Validators.required],
      person: this.personForm.formGroup
    });

    const item: Provider = (data?.provider) ? data.provider : new Provider();
    this.load(item);
  }

  protected load(p: Provider): void {
    this.itemId = p.id ? p.id : 0;
    this.dialogTitle = ((this.itemId) ? 'Actualizar datos de' : 'Nuevo') + ' Proveedor';

    if (p.businessCard) {
      this.businessCard.setValue(p.businessCard, { emitEvent: false, onlySelf: true });
    }
    this.personForm.person = (p.person) ? p.person : new Person();
  }

  public asItem(): Provider {
    if (this.formGroup.invalid) {
      return undefined;
    } else {
      return Object.assign(new Provider(), {
        id: this.itemId,
        businessCard: this.businessCard.value,
        person: this.personForm.asPerson()
      });
    }
  }

  public onSubmit(): void {
    const item = this.asItem();
    if (item) {
      this.savingSource.next(true);
      this.dataService.create(item).subscribe(
        (result: Provider) => {
          // TODO: make sure prod2 is not actually prod
          if (result.id) {
            if (item.id) {
              this.snackBarService.open('Proveedor \'' + result.person.name + '\' actualizado/a exitosamente.');
            } else {
              this.snackBarService.open('Proveedor \'' + result.person.name + '\' registrado/a exitosamente.');
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
