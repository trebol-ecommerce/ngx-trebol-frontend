import { Component, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable, Subject } from 'rxjs';
import { AppUserService } from 'src/app/app-user.service';
import { PersonFormComponent } from 'src/app/shared/person-form/person-form.component';
import { User } from 'src/data/models/entities/User';
import { passwordMatcher } from 'src/functions/passwordMatcher';

@Component({
  selector: 'app-store-registration-form-dialog',
  templateUrl: './store-registration-form-dialog.component.html',
  styleUrls: ['./store-registration-form-dialog.component.css']
})
export class StoreRegistrationFormDialogComponent
  implements OnDestroy {

  protected registeringSource: Subject<boolean> = new Subject();

  public registering$: Observable<boolean> = this.registeringSource.asObservable();

  public formGroup: FormGroup;
  public get name(): FormControl { return this.formGroup.get('name') as FormControl; }
  public get pass1(): FormControl { return this.formGroup.get('pass1') as FormControl; }
  public get pass2(): FormControl { return this.formGroup.get('pass2') as FormControl; }
  public get person(): FormGroup { return this.formGroup.get('person') as FormGroup; }
  @ViewChild('personForm', { static: true }) public personForm: PersonFormComponent;

  constructor(
    protected appUserService: AppUserService,
    protected formBuilder: FormBuilder,
    protected dialog: MatDialogRef<StoreRegistrationFormDialogComponent>
  ) {
    this.formGroup = this.formBuilder.group({
      name: ['', Validators.required],
      pass1: ['', Validators.required],
      pass2: ['', Validators.required],
      person: this.personForm.formGroup
    }, passwordMatcher);
  }

  ngOnDestroy(): void {
    this.registeringSource.complete();
  }

  public onSubmit(): void {
    this.registeringSource.next(true);
    const details: User = {
      id: null,
      name: this.name.value,
      password: this.pass1.value,
      clientId: null,
      createdOn: Date.now().toLocaleString(),
      person: this.personForm.asPerson()
    };
    this.appUserService.register(details).subscribe(
      s => {
        if (s) {
          this.dialog.close();
        }
      },
      err => {
        this.registeringSource.next(false);
      }
    );
  }

  public onCancel(): void {
    this.dialog.close();
  }

}