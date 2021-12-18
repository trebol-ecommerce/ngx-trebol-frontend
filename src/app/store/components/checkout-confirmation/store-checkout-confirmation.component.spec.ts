/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { AddressPipe } from 'src/app/shared/pipes/address/address.pipe';
import { StoreService } from '../../store.service';
import { StoreCheckoutConfirmationComponent } from './store-checkout-confirmation.component';

@Component({ selector: 'app-store-checkout-button' })
class MockStoreCheckoutButtonComponent {
  @Input() checkoutDetails: any[];
}

describe('StoreCheckoutConfirmationComponent', () => {
  let component: StoreCheckoutConfirmationComponent;
  let fixture: ComponentFixture<StoreCheckoutConfirmationComponent>;
  let mockStoreService: Partial<StoreService>;

  beforeEach(waitForAsync(() => {
    mockStoreService = {
      checkoutRequestData: null,
      checkoutButtonPress: new EventEmitter(),
      requestPayment() { return of(void 0); }
    };

    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        CommonModule,
        MatButtonModule,
        MatCardModule,
        MatDividerModule,
        MatIconModule
      ],
      declarations: [
        StoreCheckoutConfirmationComponent,
        MockStoreCheckoutButtonComponent,
        AddressPipe
      ],
      providers: [
        { provide: StoreService, useValue: mockStoreService }
      ]
    })
    .compileComponents();
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
