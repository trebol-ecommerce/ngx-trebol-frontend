/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { EventEmitter, Inject, Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { API_SERVICE_INJECTION_TOKENS } from 'src/app/api/api-service-injection-tokens';
import { Product } from 'src/app/models/entities/Product';
import { SellDetail } from 'src/app/models/entities/SellDetail';
import { ExternalPaymentRedirectionData } from 'src/app/models/ExternalPaymentRedirectionData';
import { BILLING_TYPE_COMPANY, BILLING_TYPE_NAMES_MAP } from 'src/text/billing-type-names';
import { COMMON_VALIDATION_ERROR_MESSAGE } from 'src/text/messages';
import { ICheckoutPublicApiService } from '../api/checkout-public-api.iservice';
import { CheckoutRequest } from '../models/CheckoutRequest';
import { Sell } from '../models/entities/Sell';

@Injectable()
export class StoreService
  implements OnDestroy {

  private sellDetails: SellDetail[] = [];
  private sellDetailsSource = new BehaviorSubject([]);
  private sellNetValue = 0;

  cartDetails$ = this.sellDetailsSource.asObservable();
  cartItemCount$: Observable<number>;
  cartNetValue$: Observable<number>;
  checkoutRequestData: Partial<CheckoutRequest> = null;
  checkoutButtonPress = new EventEmitter<void>();

  constructor(
    @Inject(API_SERVICE_INJECTION_TOKENS.checkout) private checkoutApiService: ICheckoutPublicApiService
  ) {
    this.cartItemCount$ = this.cartDetails$.pipe(
      map(
        array => {
          if (array.length === 0) { return 0; }
          return array.map(p => p.units).reduce((a, b) => a + b);
        }
      )
    );

    this.cartNetValue$ = this.cartDetails$.pipe(
      map(
        array => {
          if (array.length === 0) { return 0; }
          return array.map(p => p.product.price * p.units).reduce((a, b) => a + b);
        }
      ),
      tap(s => { this.sellNetValue = s; })
    );
  }

  ngOnDestroy(): void {
    this.sellDetailsSource.complete();
  }

  reset(): void {
    this.sellDetails = [];
    this.sellDetailsSource.next([]);
  }

  private findSellDetailsIndexByProductBarcode(barcode: string): number {
    return this.sellDetails.findIndex(d => d.product?.barcode === barcode);
  }

  addProductToCart(product: Product): void {
    const index: number = this.findSellDetailsIndexByProductBarcode(product.barcode);

    if (index !== -1) {
      const matchingSellDetail = this.sellDetails[index];
      matchingSellDetail.units++;
    } else {
      const newSellDetail = Object.assign<SellDetail, Partial<SellDetail>>(
        new SellDetail(),
        {
          product,
          units: 1
        }
      );
      this.sellDetails.push(newSellDetail);
    }

    this.sellDetailsSource.next(this.sellDetails);
  }

  increaseProductUnits(index: number): void {
    if (index !== -1) {
      const detalleConEsteProducto = this.sellDetails[index];
      detalleConEsteProducto.units++;

      this.sellDetailsSource.next(this.sellDetails);
    }
  }

  decreaseProductUnits(index: number): void {
    if (index !== -1) {
      const matchingDetail = this.sellDetails[index];
      matchingDetail.units--;

      if (matchingDetail.units > 0) {
        this.sellDetailsSource.next(this.sellDetails);
      } else {
        this.removeProductFromCart(index);
      }

    }
  }

  removeProductFromCart(i: number): void {
    if (i !== -1) {
      this.sellDetails.splice(i, 1);
      this.sellDetailsSource.next(this.sellDetails);
    }
  }

  /**
   * Sends a request for a new payment transaction
   *
   * @param customerData An object containg information about the customer
   * @param checkoutDetails An array of product/service details about this transaction
   */
  requestPayment(): Observable<ExternalPaymentRedirectionData> {
    if (!this.checkoutRequestData) {
      return throwError({ message: COMMON_VALIDATION_ERROR_MESSAGE });
    } else {
      const sell = this.createCheckoutRequest();
      return this.checkoutApiService.submitCart(sell);
    }
  }

  private createCheckoutRequest(): Sell {
    const target: Partial<Sell> = {
      customer: {
        person: this.checkoutRequestData.customer
      },
      details: this.sellDetails
    };

    const billing = this.checkoutRequestData.billing;
    target.billingType = billing.sellType;
    if (billing.sellType === BILLING_TYPE_NAMES_MAP.get(BILLING_TYPE_COMPANY)) {
      if (billing.company) {
        target.billingCompany = billing.company;
      }
      if (billing.address){
        target.billingAddress = billing.address;
      }
    }

    const shipping = this.checkoutRequestData.shipping;
    if (shipping.requestShipping && shipping.shippingAddress) {
      target.shippingAddress = shipping.shippingAddress;
    }

    return target as Sell;
  }
}
