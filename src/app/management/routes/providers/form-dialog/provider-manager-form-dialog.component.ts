import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Person } from 'src/app/data/models/entities/Person';
import { Provider } from 'src/app/data/models/entities/Provider';
import { PersonFormComponent } from 'src/app/shared/person-form/person-form.component';
import { COMMON_WARNING_MESSAGE, UNKNOWN_ERROR_MESSAGE } from 'src/text/messages';
import { DataManagerFormComponent } from '../../data-manager-form.acomponent';
import { ProviderManagerFormService } from './provider-manager-form.service';

export interface ProviderManagerFormDialogData {
  provider: Provider;
}

@Component({
  providers: [ ProviderManagerFormService ],
  selector: 'app-provider-manager-form-dialog',
  templateUrl: './provider-manager-form-dialog.component.html',
  styleUrls: [ './provider-manager-form-dialog.component.css' ]
})
export class ProviderManagerFormDialogComponent
  extends DataManagerFormComponent<Provider>
  implements OnInit, AfterViewInit {

  protected itemId: number;

  public saving$: Observable<boolean>;

  public formGroup: FormGroup;
  public get businessCard(): FormControl { return this.formGroup.get('businessCard') as FormControl; }
  @ViewChild('personForm', { static: true }) public personForm: PersonFormComponent;

  public get dialogTitle(): string { return ((this.data?.provider?.id) ? 'Actualizar datos de' : 'Nuevo') + ' Proveedor'; };

  constructor(
    @Inject(MAT_DIALOG_DATA) protected data: ProviderManagerFormDialogData,
    protected service: ProviderManagerFormService,
    protected dialog: MatDialogRef<ProviderManagerFormDialogComponent>,
    protected snackBarService: MatSnackBar,
    protected formBuilder: FormBuilder
  ) {
    super();
    this.formGroup = this.formBuilder.group({
      businessCard: ['', Validators.required]
    });
  }

  protected load(p: Provider): void {
    this.itemId = p.id ? p.id : 0;

    this.personForm.person = (p.person) ? p.person : new Person();
  }

  ngOnInit(): void {
    this.saving$ = this.service.saving$.pipe();
  }

  ngAfterViewInit(): void {
    this.formGroup.addControl('person', this.personForm.formGroup);

    const item: Provider = (this.data?.provider) ? this.data.provider : new Provider();
    this.load(item);
  }

  public asItem(): Provider {
    if (this.formGroup.invalid) {
      return undefined;
    } else {
      return Object.assign<Provider, Partial<Provider>>(
        new Provider(),
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
              this.snackBarService.open(`Proveedor ${item.person.name} actualizado/a exitosamente`, 'OK');
            } else {
              this.snackBarService.open(`Proveedor ${item.person.name} registrado/a exitosamente`, 'OK');
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
