/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpApiService } from 'src/app/api/http/http-api.abstract.service';
import { Customer } from 'src/models/entities/Customer';
import { Sell } from 'src/models/entities/Sell';
import { ExternalPaymentRedirectionData } from 'src/models/ExternalPaymentRedirectionData';
import { environment } from 'src/environments/environment';
import { BILLING_TYPE_COMPANY, BILLING_TYPE_NAMES_MAP } from 'src/text/billing-type-names';
import { ICheckoutPublicApiService } from '../../checkout-public-api.iservice';

@Injectable()
export class CheckoutPublicHttpApiService
  extends HttpApiService
  implements ICheckoutPublicApiService {

  protected baseUrl = `${environment.apiUrls.public}/checkout`;

  constructor(http: HttpClient) {
    super(http);
  }

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

  private shrinkCustomerModel(source: Customer): Partial<Customer> {
    const target = { person: { } } as any;
    target.person.idNumber = source.person.idNumber;
    target.person.firstName = source.person.firstName;
    target.person.lastName = source.person.lastName;
    target.person.email = source.person.email;
    if (source.person.phone1) {
      target.person.phone1 = source.person.phone1;
    }
    if (source.person.phone2) {
      target.person.phone2 = source.person.phone2;
    }
    return target;
  }
}
