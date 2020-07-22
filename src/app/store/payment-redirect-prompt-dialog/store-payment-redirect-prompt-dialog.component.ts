import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { concatMap, map, tap, mapTo } from 'rxjs/operators';
import { AppUserService } from 'src/app/app-user.service';
import { Sell } from 'src/data/models/entities/Sell';
import { SellDetail } from 'src/data/models/entities/SellDetail';
import { CompositeEntityDataIService } from 'src/data/services/composite-entity.data.iservice';
import { DATA_INJECTION_TOKENS } from 'src/data/services/data-injection-tokens';
import { environment } from 'src/environments/environment';
import { StoreService } from '../store.service';
import { DomSanitizer } from '@angular/platform-browser';

interface ExternalPaymentRedirectionData {
  url: string,
  token_ws: string
}

@Component({
  selector: 'app-store-payment-redirect-prompt-dialog',
  templateUrl: './store-payment-redirect-prompt-dialog.component.html',
  styleUrls: ['./store-payment-redirect-prompt-dialog.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class StorePaymentRedirectPromptDialogComponent
  implements OnInit {

  protected externalDataSource: Subject<ExternalPaymentRedirectionData> = new Subject();

  public loading$: Observable<boolean>;
  public webpayURL$: Observable<string>;
  public webpayToken$: Observable<string>;

  constructor(
    protected appUserService: AppUserService,
    protected service: StoreService,
    protected httpClient: HttpClient,
    protected domSanitizer: DomSanitizer,
    @Inject(DATA_INJECTION_TOKENS.sales) protected saleDataService: CompositeEntityDataIService<Sell, SellDetail>
  ) {
    this.loading$ = this.externalDataSource.asObservable().pipe(mapTo(false));
    this.webpayURL$ = this.externalDataSource.asObservable().pipe(map(data => data.url));
    this.webpayToken$ = this.externalDataSource.asObservable().pipe(map(data => data.token_ws));
  }

  protected parseFormData(subtotal: number): FormData {
    const total = String(Math.round(subtotal * 1.19));
    const sessionId = String(this.appUserService.getCurrentSession().id);
    const formData = new FormData();
    formData.append('tr_amount', total);
    formData.append('tr_session', sessionId);
    formData.append('tr_id', '1');
    return formData;
  }

  protected fetchWebpayRedirectionData(data: FormData): Observable<ExternalPaymentRedirectionData> {
    return this.httpClient.post<ExternalPaymentRedirectionData>(
      environment.checkoutURL,
      data
    );
  }

  protected initiateWebpayTransaction(): void {
    this.service.sellSubtotalValue$.pipe(
      map((subtotal) => this.parseFormData(subtotal)),
      concatMap((data) => this.fetchWebpayRedirectionData(data))
    ).subscribe(
      data => {
        this.externalDataSource.next(data);
        this.externalDataSource.complete();
      }
    );
  }

  ngOnInit(): void {
    this.initiateWebpayTransaction();
  }

  public redirect(event: any) {
    console.log('redirect');
    console.log(event);

  }
}
