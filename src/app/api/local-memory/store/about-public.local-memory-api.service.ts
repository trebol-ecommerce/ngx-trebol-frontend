// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CompanyDetails } from 'src/app/models/CompanyDetails';
import { Product } from 'src/app/models/entities/Product';
import { Receipt } from 'src/app/models/entities/Receipt';
import { IAboutPublicApiService } from '../../about-public-api.iservice';
import { API_SERVICE_INJECTION_TOKENS } from '../../api-service-injection-tokens';
import { EntityDataLocalMemoryApiService } from '../entity-data.local-memory-api.abstract.service';
import { MOCK_COMPANY_DETAILS } from './examples/mock-company-details.examples';

@Injectable()
export class AboutPublicLocalMemoryApiService
  implements IAboutPublicApiService {

  protected items: Product[] = [];

  constructor(
    @Inject(API_SERVICE_INJECTION_TOKENS.dataProducts) private dataService: EntityDataLocalMemoryApiService<Product>
  ) {
    this.dataService.fetchPage().subscribe(response => {
      this.items = response.items;
    });
  }

  fetchCompanyDetails(): Observable<CompanyDetails> {
    return of(MOCK_COMPANY_DETAILS);
  }
}
