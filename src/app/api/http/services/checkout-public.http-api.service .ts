/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from 'src/models/entities/Order';
import { ExternalPaymentRedirectionData } from 'src/models/ExternalPaymentRedirectionData';
import { environment } from 'src/environments/environment';
import { BILLING_TYPE_COMPANY } from 'src/text/billing-type-names';
import { ICheckoutPublicApiService } from '../../checkout-public-api.iservice';
import { Person } from 'src/models/entities/Person';

@Injectable()
export class CheckoutPublicHttpApiService
  implements ICheckoutPublicApiService {

  private readonly baseUrl = `${environment.apiUrls.public}/checkout`;

  constructor(private http: HttpClient) { }

  submitCart(order: Order) {
    const payload = {} as any;
    payload.details = order.details;
    payload.billingType = order.billingType;
    payload.customer = this.shrinkCustomerModel(order.customer);
    payload.paymentType = "WebPay Plus"; // TODO parameterize this value

    if (order.billingType === BILLING_TYPE_COMPANY) {
      payload.billingAddress = order.billingAddress;
      payload.billingCompany = order.billingCompany;
    }

    if (order.shippingAddress) {
      payload.shippingAddress = order.shippingAddress;
    }

    if (order.salesperson) {
      payload.salesperson = order.salesperson;
    }

    return this.http.post<ExternalPaymentRedirectionData>(
      this.baseUrl,
      payload
    );
  }

  private shrinkCustomerModel(source: Person): Person {
    const target = { } as any;
    target.idNumber = source.idNumber;
    target.firstName = source.firstName;
    target.lastName = source.lastName;
    target.email = source.email;
    if (source.phone1) {
      target.phone1 = source.phone1;
    }
    if (source.phone2) {
      target.phone2 = source.phone2;
    }
    return target;
  }
}
