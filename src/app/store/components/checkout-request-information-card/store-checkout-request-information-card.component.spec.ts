/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { AddressPipe } from 'src/app/shared/pipes/address/address.pipe';
import { CheckoutRequest } from 'src/models/CheckoutRequest';
import { StoreCheckoutRequestInformationCardComponent } from './store-checkout-request-information-card.component';

describe('StoreCheckoutRequestInformationCardComponent', () => {
  let component: StoreCheckoutRequestInformationCardComponent;
  let fixture: ComponentFixture<StoreCheckoutRequestInformationCardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        MatCardModule,
        MatIconModule
      ],
      declarations: [
        StoreCheckoutRequestInformationCardComponent,
        AddressPipe
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreCheckoutRequestInformationCardComponent);
    component = fixture.componentInstance;
    component.checkoutRequest = new CheckoutRequest();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
