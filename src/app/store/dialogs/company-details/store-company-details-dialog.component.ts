import { Component, Inject, OnInit } from '@angular/core';
import { CompanyDetails } from 'src/app/data/models/CompanyDetails';
import { DATA_INJECTION_TOKENS } from 'src/app/data/data-injection-tokens';
import { SharedDataIService } from 'src/app/data/shared.data.iservice';
import { Observable } from 'rxjs';
import { mapTo, pluck, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-store-company-details-dialog',
  templateUrl: './store-company-details-dialog.component.html',
  styleUrls: ['./store-company-details-dialog.component.css']
})
export class StoreCompanyDetailsDialogComponent
  implements OnInit {

  public data$: Observable<CompanyDetails>;
  public loading$: Observable<boolean>;
  public name$: Observable<string>;
  public description$: Observable<string>;
  public bannerURL$: Observable<string>;
  public logoURL$: Observable<string>;


  constructor(
    @Inject(DATA_INJECTION_TOKENS.shared) protected sharedDataService: SharedDataIService
  ) { }

  ngOnInit(): void {
    this.data$ = this.sharedDataService.readCompanyDetails();
    this.loading$ = this.data$.pipe(mapTo(false), startWith(true));
    this.name$ = this.data$.pipe(pluck('name'));
    this.description$ = this.data$.pipe(pluck('description'));
    this.bannerURL$ = this.data$.pipe(pluck('bannerImageURL'));
    this.logoURL$ = this.data$.pipe(pluck('logoImageURL'));
  }

}
