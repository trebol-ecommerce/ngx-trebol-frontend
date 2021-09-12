// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Component, OnDestroy, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable, Subject } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { PersonFormComponent } from 'src/app/shared/components/person-form/person-form.component';

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

  get person() { return this.formGroup.get('person') as FormControl; }

  constructor(
    protected appService: AppService,
    protected dialog: MatDialogRef<StoreGuestShippingFormDialogComponent>,
    protected formBuilder: FormBuilder
  ) {
    this.formGroup = this.formBuilder.group({
      person: ['']
    });
  }

  ngOnDestroy(): void {
    this.savingSource.complete();
  }

  public onSubmit(): void {
    this.savingSource.next(true);
    this.appService.guestLogin(this.person.value).subscribe(
      success => {
        if (success) {
          this.dialog.close();
        }
      },
      () => {
        this.savingSource.next(false);
      }
    );
  }

  public onCancel(): void {
    this.appService.cancelAuthentication();
    this.dialog.close();
  }


}
