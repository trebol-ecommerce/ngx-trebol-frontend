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
import { OrderDetail } from 'src/models/entities/OrderDetail';
import { ExternalPaymentRedirectionData } from 'src/models/ExternalPaymentRedirectionData';
import { BILLING_TYPE_COMPANY } from 'src/text/billing-type-names';
import { Order } from '../../models/entities/Order';
import { ICheckoutPublicApiService } from '../api/checkout-public-api.iservice';

@Injectable({ providedIn: 'root' })
export class StoreCheckoutService {

  constructor(
    @Inject(API_INJECTION_TOKENS.checkout) private checkoutApiService: ICheckoutPublicApiService
  ) { }

  // TODO refactor to a single object parameter requiring both properties
  /**
   * Sends a request for a new payment transaction
   *
   * @param customerData An object containg information about the customer
   * @param checkoutDetails An array of product/service details about this transaction
   */
  requestTransaction(data: CheckoutRequest, cartDetails: OrderDetail[]): Observable<ExternalPaymentRedirectionData> {
    const order = this.createCheckoutRequest(data, cartDetails);
    return this.checkoutApiService.submitCart(order);
  }

  private createCheckoutRequest(checkoutRequestData: CheckoutRequest, cartDetails: OrderDetail[]): Order {
    const target: Partial<Order> = {
      customer: checkoutRequestData.customer,
      details: cartDetails
    };

    const billing = checkoutRequestData.billing;
    target.billingType = billing.typeName;
    if (billing.typeName === BILLING_TYPE_COMPANY) {
      if (billing.company) {
        target.billingCompany = billing.company;
      }
      if (billing.address){
        target.billingAddress = billing.address;
      }
    }

    const shipping = checkoutRequestData.shipping;
    if (shipping?.included && shipping?.address) {
      target.shippingAddress = shipping.address;
    }

    return target as Order;
  }
}
