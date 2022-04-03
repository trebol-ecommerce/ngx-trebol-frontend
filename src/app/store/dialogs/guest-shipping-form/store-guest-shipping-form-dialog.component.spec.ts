/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { AuthenticationService } from 'src/app/authentication.service';
import { EntityFormGroupFactoryService } from 'src/app/shared/entity-form-group-factory.service';
import { CheckoutRequest } from 'src/models/CheckoutRequest';
import { StoreCartService } from '../../store-cart.service';
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
  let mockAuthenticationService: Partial<AuthenticationService>;
  let mockDialogRef: Partial<MatDialogRef<any>>;
  let mockCartService: Partial<StoreCartService>;

  beforeEach(waitForAsync(() => {
    mockAuthenticationService = {
      guestLogin() { return of(''); },
      cancelAuthentication() { }
    };
    mockDialogRef = {
      close() { return of(void 0); }
    };
    mockCartService = {
      checkoutRequestData: new CheckoutRequest()
    };

    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
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
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: AuthenticationService, useValue: mockAuthenticationService },
        { provide: StoreCartService, useValue: mockCartService },
        EntityFormGroupFactoryService
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
