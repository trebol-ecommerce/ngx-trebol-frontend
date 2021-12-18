/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { StoreGuestShippingFormDialogComponent } from './store-guest-shipping-form-dialog.component';


@Component({ selector: 'app-centered-mat-spinner' })
class MockCenteredMatSpinnerComponent { }

@Component({
  selector: 'app-person-form',
  providers: [{ provide: NG_VALUE_ACCESSOR, multi: true, useExisting: MockPersonFormComponent }]
})
class MockPersonFormComponent
  implements ControlValueAccessor {
  onchange = (v: any) => { }
  ontouched = () => { }
  writeValue(obj: any): void { }
  registerOnChange(fn: (v: any) => any): void { this.onchange = fn; }
  registerOnTouched(fn: () => any): void { this.ontouched = fn; }
}

describe('StoreGuestShippingFormDialogComponent', () => {
  let component: StoreGuestShippingFormDialogComponent;
  let fixture: ComponentFixture<StoreGuestShippingFormDialogComponent>;
  let appService: Partial<AppService>;

  beforeEach(waitForAsync(() => {
    appService = {
      guestLogin() { return of(true); }
    };

    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatDialogModule
      ],
      declarations: [
        StoreGuestShippingFormDialogComponent,
        MockCenteredMatSpinnerComponent,
        MockPersonFormComponent
      ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: AppService, useValue: appService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreGuestShippingFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
