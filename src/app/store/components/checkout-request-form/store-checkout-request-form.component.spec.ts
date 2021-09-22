/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, EventEmitter } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StoreService } from '../../store.service';
import { StoreCheckoutRequestFormComponent } from './store-checkout-request-form.component';

@Component({
  selector: 'app-store-billing-details-form',
  providers: [{ provide: NG_VALUE_ACCESSOR, multi: true, useExisting: MockStoreBillingDetailsFormComponent }]
})
class MockStoreBillingDetailsFormComponent
  implements ControlValueAccessor {
  writeValue(obj: any): void { }
  registerOnChange(fn: any): void { }
  registerOnTouched(fn: any): void { }
  setDisabledState?(isDisabled: boolean): void { }
}

@Component({
  selector: 'app-person-form',
  providers: [{ provide: NG_VALUE_ACCESSOR, multi: true, useExisting: MockPersonFormComponent }]
})
class MockPersonFormComponent
  implements ControlValueAccessor {
  writeValue(obj: any): void { }
  registerOnChange(fn: any): void { }
  registerOnTouched(fn: any): void { }
  setDisabledState?(isDisabled: boolean): void { }
}

@Component({
  selector: 'app-store-shipping-form',
  providers: [{ provide: NG_VALUE_ACCESSOR, multi: true, useExisting: MockStoreShippingFormComponent }]
})
class MockStoreShippingFormComponent
  implements ControlValueAccessor {
  writeValue(obj: any): void { }
  registerOnChange(fn: any): void { }
  registerOnTouched(fn: any): void { }
  setDisabledState?(isDisabled: boolean): void { }
}

describe('StoreCheckoutRequestFormComponent', () => {
  let component: StoreCheckoutRequestFormComponent;
  let fixture: ComponentFixture<StoreCheckoutRequestFormComponent>;
  let mockSnackBarService: Partial<MatSnackBar>;
  let mockStoreService: Partial<StoreService>;

  beforeEach(waitForAsync(() => {
    mockSnackBarService = {
      open(m: string, a: string) { return void 0; }
    };
    mockStoreService = {
      checkoutRequestData: null,
      checkoutButtonPress: new EventEmitter()
    };

    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatButtonModule,
        MatIconModule
      ],
      declarations: [
        StoreCheckoutRequestFormComponent,
        MockStoreBillingDetailsFormComponent,
        MockPersonFormComponent,
        MockStoreShippingFormComponent
      ],
      providers: [
        { provide: MatSnackBar, useValue: mockSnackBarService },
        { provide: StoreService, useValue: mockStoreService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreCheckoutRequestFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
