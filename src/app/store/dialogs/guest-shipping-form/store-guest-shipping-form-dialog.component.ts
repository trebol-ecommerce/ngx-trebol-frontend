/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable, Subject } from 'rxjs';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-store-guest-shipping-form-dialog',
  templateUrl: './store-guest-shipping-form-dialog.component.html',
  styleUrls: ['./store-guest-shipping-form-dialog.component.css']
})
export class StoreGuestShippingFormDialogComponent
  implements OnDestroy {

  private savingSource = new Subject<boolean>();

  saving$ = this.savingSource.asObservable();

  formGroup: FormGroup;

  get person() { return this.formGroup.get('person') as FormControl; }

  constructor(
    private appService: AppService,
    private dialog: MatDialogRef<StoreGuestShippingFormDialogComponent>,
    private formBuilder: FormBuilder
  ) {
    this.formGroup = this.formBuilder.group({
      person: ['']
    });
  }

  ngOnDestroy(): void {
    this.savingSource.complete();
  }

  onSubmit(): void {
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

  onCancel(): void {
    this.appService.cancelAuthentication();
    this.dialog.close();
  }

}
