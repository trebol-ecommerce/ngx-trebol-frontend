/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BillingType } from 'src/models/entities/BillingType';
import { EntityDataHttpApiService } from '../entity-data.http-api.abstract.service';

@Injectable()
export class BillingTypesDataHttpApiService
  extends EntityDataHttpApiService<BillingType> {

  constructor(http: HttpClient) {
    super(http, '/billing_types');
  }
}
