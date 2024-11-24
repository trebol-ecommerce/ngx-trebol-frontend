/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Sell } from 'src/models/entities/Sell';
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

  submitCart(sell: Sell) {
    const payload = {} as any;
    payload.details = sell.details;
    payload.billingType = sell.billingType;
    payload.customer = this.shrinkCustomerModel(sell.customer);
    payload.paymentType = "WebPay Plus"; // TODO parameterize this value

    if (sell.billingType === BILLING_TYPE_COMPANY) {
      payload.billingAddress = sell.billingAddress;
      payload.billingCompany = sell.billingCompany;
    }

    if (sell.shippingAddress) {
      payload.shippingAddress = sell.shippingAddress;
    }

    if (sell.salesperson) {
      payload.salesperson = sell.salesperson;
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
