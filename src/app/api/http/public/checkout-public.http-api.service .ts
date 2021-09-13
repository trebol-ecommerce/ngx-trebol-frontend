// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpApiService } from 'src/app/api/http/http-api.abstract.service';
import { SellDetail } from 'src/app/models/entities/SellDetail';
import { ExternalPaymentRedirectionData } from 'src/app/models/ExternalPaymentRedirectionData';
import { environment } from 'src/environments/environment';
import { ICheckoutPublicApiService } from '../../checkout-public-api.iservice';

@Injectable()
export class CheckoutPublicHttpApiService
  extends HttpApiService
  implements ICheckoutPublicApiService {

  protected baseUrl = `${environment.apiUrls.public}/checkout`;

  constructor(http: HttpClient) {
    super(http);
  }

  submitCart(details: SellDetail[]) {
    return this.http.post<ExternalPaymentRedirectionData>(
      this.baseUrl,
      details
    );
  }
}
