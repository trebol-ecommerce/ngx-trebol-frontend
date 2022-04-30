/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of, timer } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CheckoutRequest } from 'src/models/CheckoutRequest';
import { ExternalPaymentRedirectionData } from 'src/models/ExternalPaymentRedirectionData';
import { observeIfEventFiresUponCallback } from 'src/test-functions/observeIfEventFiresUponCallback';
import { StoreCartService } from '../../store-cart.service';
import { StoreCheckoutService } from '../../store-checkout.service';
import { StoreCheckoutConfirmationComponent } from './store-checkout-confirmation.component';

@Component({ selector: 'app-store-checkout-request-information-card' })
class MockStoreCheckoutRequestInformationCardComponent {
  @Input() checkoutRequest: CheckoutRequest;
}

@Component({ selector: 'app-store-checkout-confirmation-button' })
class MockStoreCheckoutRequestButtonComponent {
  @Input() disabled: boolean;
}

@Component({ selector: 'app-store-checkout-button' })
class MockStoreCheckoutButtonComponent {
  @Input() checkoutDetails: ExternalPaymentRedirectionData;
}

describe('StoreCheckoutConfirmationComponent', () => {
  let component: StoreCheckoutConfirmationComponent;
  let fixture: ComponentFixture<StoreCheckoutConfirmationComponent>;
  let cartServiceSpy: jasmine.SpyObj<StoreCartService>;
  let checkoutServiceSpy: jasmine.SpyObj<StoreCheckoutService>;

  beforeEach(waitForAsync(() => {
    const mockCartService = jasmine.createSpyObj('StoreCartService', ['checkoutRequest$', 'cartDetails$']);
    const mockCheckoutService = jasmine.createSpyObj('StoreCheckoutService', ['requestTransaction']);

    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        MatDividerModule,
        MatIconModule
      ],
      declarations: [
        MockStoreCheckoutRequestInformationCardComponent,
        MockStoreCheckoutRequestButtonComponent,
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
    cartServiceSpy = TestBed.inject(StoreCartService) as jasmine.SpyObj<StoreCartService>;
    checkoutServiceSpy = TestBed.inject(StoreCheckoutService) as jasmine.SpyObj<StoreCheckoutService>;
    cartServiceSpy.checkoutRequest$ = of(new CheckoutRequest());
    cartServiceSpy.cartDetails$ = of([]);

    fixture = TestBed.createComponent(StoreCheckoutConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fire `confirmed` event when `onClickRequest()` is called', () => {
    const fakeData = new ExternalPaymentRedirectionData();
    checkoutServiceSpy.requestTransaction.and.returnValue(of(fakeData));
    observeIfEventFiresUponCallback(
      component.confirmed,
      () => component.onClickConfirm()
    ).pipe(
      tap(didFireEvent => expect(didFireEvent).toBeTrue())
    ).subscribe();
  });
});
