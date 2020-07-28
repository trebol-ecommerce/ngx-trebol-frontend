import { Component, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable, Subject } from 'rxjs';
import { AppUserService } from 'src/app/app-user.service';
import { PersonFormComponent } from 'src/app/shared/person-form/person-form.component';
import { StoreRegistrationFormDialogComponent } from '../registration-form/store-registration-form-dialog.component';

@Component({
  selector: 'app-store-guest-shipping-form-dialog',
  templateUrl: './store-guest-shipping-form-dialog.component.html',
  styleUrls: ['./store-guest-shipping-form-dialog.component.css']
})
export class StoreGuestShippingFormDialogComponent
  implements OnDestroy {

  protected savingSource: Subject<boolean> = new Subject();

  public saving$: Observable<boolean> = this.savingSource.asObservable();

  public formGroup: FormGroup;
  @ViewChild('personForm', { static: true }) public personForm: PersonFormComponent;

  constructor(
    protected appUserService: AppUserService,
    protected dialog: MatDialogRef<StoreRegistrationFormDialogComponent>,
    protected formBuilder: FormBuilder
  ) {
    this.formGroup = this.formBuilder.group({
      person: this.personForm.formGroup
    });
  }

  ngOnDestroy(): void {
    this.savingSource.complete();
  }

  public onSubmit(): void {
    this.savingSource.next(true);
    this.appUserService.guestLogin(this.personForm.asPerson()).subscribe(
      s => {
        if (s) {
          this.dialog.close();
        }
      },
      () => {
        this.savingSource.next(false);
      }
    );
  }

  public onCancel(): void {
    this.dialog.close();
  }


}
