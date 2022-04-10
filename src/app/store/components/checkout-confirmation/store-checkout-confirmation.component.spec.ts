/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, EventEmitter, Input } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { CheckoutRequest } from 'src/models/CheckoutRequest';
import { StoreCartService } from '../../store-cart.service';
import { StoreCheckoutService } from '../../store-checkout.service';
import { StoreCheckoutConfirmationComponent } from './store-checkout-confirmation.component';

@Component({ selector: 'app-store-checkout-request-information-card' })
class MockStoreCheckoutRequestInformationCardComponent {
  @Input() checkoutRequest: CheckoutRequest;
}

@Component({ selector: 'app-store-checkout-button' })
class MockStoreCheckoutButtonComponent {
  @Input() checkoutDetails: any[];
}

describe('StoreCheckoutConfirmationComponent', () => {
  let component: StoreCheckoutConfirmationComponent;
  let fixture: ComponentFixture<StoreCheckoutConfirmationComponent>;
  let mockCartService: Partial<StoreCartService>;
  let mockCheckoutService: Partial<StoreCheckoutService>;

  beforeEach(waitForAsync(() => {
    mockCartService = {
      checkoutRequestData: null,
      checkoutButtonPress: new EventEmitter()
    };
    mockCheckoutService = {
      requestPayment() { return of(void 0); }
    };

    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        MatButtonModule,
        MatDividerModule,
        MatIconModule
      ],
      declarations: [
        MockStoreCheckoutRequestInformationCardComponent,
        MockStoreCheckoutButtonComponent,
        StoreCheckoutConfirmationComponent,
      ],
      providers: [
        { provide: StoreCartService, useValue: mockCartService },
        { provide: StoreCheckoutService, useValue: mockCheckoutService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreCheckoutConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
