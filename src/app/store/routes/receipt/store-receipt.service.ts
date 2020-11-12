// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map, pluck, startWith } from 'rxjs/operators';
import { Sell } from 'src/app/models/entities/Sell';
import { SellDetail } from 'src/app/models/entities/SellDetail';
import { CompositeEntityDataApiIService } from 'src/app/api/data-mgt/composite-entity-data-api.iservice';
import { API_SERVICE_INJECTION_TOKENS } from 'src/app/api/api-service-injection-tokens';

@Injectable()
export class StoreReceiptService {

  protected sellSource: Subject<Sell> = new BehaviorSubject(null);

  public sell$: Observable<Sell> = this.sellSource.asObservable();
  public loading$: Observable<boolean> = this.sell$.pipe(map(v => !v), startWith(true));
  public details$: Observable<SellDetail[]> = this.sell$.pipe(pluck('details'));
  public soldOn$: Observable<string> = this.sell$.pipe(pluck('soldOn'));

  constructor(
    @Inject(API_SERVICE_INJECTION_TOKENS.salesCrud) protected sellDataService: CompositeEntityDataApiIService<Sell, SellDetail>,
    protected router: Router
  ) {
  }

  public fetchSell(id: number): void {
    this.sellDataService.readById(id).subscribe(
      sell => {
        this.sellSource.next(sell);
      },
      err => {
        this.router.navigateByUrl('/');
      }
    );
  }
}
