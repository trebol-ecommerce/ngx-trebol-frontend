// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Salesperson } from 'src/app/models/entities/Salesperson';
import { TransactionalEntityDataHttpApiService } from '../transactional-entity-data.http-api.abstract.service';
import { IEntityDataApiService } from '../../entity.data-api.iservice';
import { DataPage } from 'src/app/models/DataPage';

@Injectable()
export class SalespeopleDataHttpApiService
  extends TransactionalEntityDataHttpApiService<Salesperson>
  implements IEntityDataApiService<Salesperson> {

  baseUrl = `${super.baseUrl}/salespeople`;

  constructor(http: HttpClient) {
    super(http);
  }
}
