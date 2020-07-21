import { Component, OnInit, Inject } from '@angular/core';
import { StoreService } from '../store.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { concatMap, map } from 'rxjs/operators';
import { AppUserService } from 'src/app/app-user.service';
import { DATA_INJECTION_TOKENS } from 'src/data/services/data-injection-tokens';
import { Observable, BehaviorSubject, Subject, of } from 'rxjs';
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

  protected parseFormData(subtotal: number): FormData {
    const total = String(Math.round(subtotal * 1.19));
    const sessionId = String(this.appUserService.getCurrentSession().id);
    const formData = new FormData();
    formData.append('tr_amount', total);
    formData.append('tr_session', sessionId);
    formData.append('tr_id', '1');
    return formData;
  }

  protected fetchWebpayHTMLForm(data: FormData): Observable<string> {
    return this.httpClient.post(
      'https://webpay-test.benjaminlamadrid.cl/',
      data,
      { responseType: 'text' }
    );
  }

  protected loadPaymentRedirectForm(): void {
    this.service.sellSubtotalValue$.pipe(
      map((subtotal) => this.parseFormData(subtotal)),
      concatMap((data) => this.fetchWebpayHTMLForm(data))
    ).subscribe(
      (html: string) => {
        document.getElementById('store-payment-external-content-wrapper').innerHTML = html;
        this.loadingSource.next(false);
      }
    )
  }

  ngOnInit(): void {
    this.loadPaymentRedirectForm();
  }
}
