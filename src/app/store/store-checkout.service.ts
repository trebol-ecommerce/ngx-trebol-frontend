/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_INJECTION_TOKENS } from 'src/app/api/api-injection-tokens';
import { CheckoutRequest } from 'src/models/CheckoutRequest';
import { SellDetail } from 'src/models/entities/SellDetail';
import { ExternalPaymentRedirectionData } from 'src/models/ExternalPaymentRedirectionData';
import { BILLING_TYPE_COMPANY, BILLING_TYPE_NAMES_MAP } from 'src/text/billing-type-names';
import { Sell } from '../../models/entities/Sell';
import { ICheckoutPublicApiService } from '../api/checkout-public-api.iservice';

@Injectable()
export class StoreCheckoutService {

  constructor(
    @Inject(API_INJECTION_TOKENS.checkout) private checkoutApiService: ICheckoutPublicApiService
  ) { }

  /**
   * Sends a request for a new payment transaction
   *
   * @param customerData An object containg information about the customer
   * @param checkoutDetails An array of product/service details about this transaction
   */
  requestPayment(data: CheckoutRequest, cartDetails: SellDetail[]): Observable<ExternalPaymentRedirectionData> {
    const sell = this.createCheckoutRequest(data, cartDetails);
    return this.checkoutApiService.submitCart(sell);
  }

  private createCheckoutRequest(checkoutRequestData: CheckoutRequest, cartDetails: SellDetail[]): Sell {
    const target: Partial<Sell> = {
      customer: {
        person: checkoutRequestData.customer
      },
      details: cartDetails
    };

    const billing = checkoutRequestData.billing;
    target.billingType = billing.sellType;
    if (billing.sellType === BILLING_TYPE_NAMES_MAP.get(BILLING_TYPE_COMPANY)) {
      if (billing.company) {
        target.billingCompany = billing.company;
      }
      if (billing.address){
        target.billingAddress = billing.address;
      }
    }

    const shipping = checkoutRequestData.shipping;
    if (shipping?.requestShipping && shipping?.shippingAddress) {
      target.shippingAddress = shipping.shippingAddress;
    }

    return target as Sell;
  }
}
