// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Sell } from 'src/app/models/entities/Sell';
import { SellDetail } from 'src/app/models/entities/SellDetail';
import { ICompositeEntityDataApiService } from '../../composite-entity.data-api.iservice';
import { TransactionalEntityDataHttpApiService } from '../transactional-entity-data.http-api.abstract.service';
import { DataPage } from 'src/app/models/DataPage';

@Injectable()
export class SalesDataHttpApiService
  extends TransactionalEntityDataHttpApiService<Sell>
  implements ICompositeEntityDataApiService<Sell, SellDetail> {

  baseUrl = `${super.baseUrl}/sales`;

  constructor(http: HttpClient) {
    super(http);
  }

  public readDetailsById(id: number) {
    return this.readById(id).pipe(
      map(s => s.details)
    );
  }
}
