import { Component, OnInit, Inject } from '@angular/core';
import { StoreService } from '../store.service';
import { HttpClient } from '@angular/common/http';
import { concatMap } from 'rxjs/operators';
import { AppUserService } from 'src/app/app-user.service';
import { DATA_INJECTION_TOKENS } from 'src/data/services/data-injection-tokens';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { CompositeEntityDataIService } from 'src/data/services/composite-entity.data.iservice';
import { Sell } from 'src/data/models/entities/Sell';
import { SellDetail } from 'src/data/models/entities/SellDetail';

@Component({
  selector: 'app-store-payment-redirect-prompt-dialog',
  templateUrl: './store-payment-redirect-prompt-dialog.component.html',
  styleUrls: ['./store-payment-redirect-prompt-dialog.component.css']
})
export class StorePaymentRedirectPromptDialogComponent
  implements OnInit {

  protected loadingSource: Subject<boolean> = new BehaviorSubject(true);

  public loading$: Observable<boolean> = this.loadingSource.asObservable();

  constructor(
    protected appUserService: AppUserService,
    protected service: StoreService,
    protected httpClient: HttpClient,
    @Inject(DATA_INJECTION_TOKENS.sales) protected saleDataService: CompositeEntityDataIService<Sell, SellDetail>
  ) { }

  ngOnInit(): void {
    this.fetchSellData();
  }

  public fetchSellData(): void {
    this.service.sellSubtotalValue$.pipe(
      concatMap(
        subtotal => {
          const total = Math.round(subtotal*1.19);
          const sessionId = this.appUserService.getCurrentSession().id;
          return this.httpClient.post<string>(
            'http://newbazaarwebpayphp-env.eba-2ybt2gv3.sa-east-1.elasticbeanstalk.com/',
            {
              tr_amount: total,
              tr_session: sessionId,
              tr_id: 1
            }
          );
        }
      )
    ).subscribe(
      s => {
        document.getElementById('store-payment-external-content-wrapper').innerHTML = s;
        this.loadingSource.next(false);
      }
    )
  }

}
