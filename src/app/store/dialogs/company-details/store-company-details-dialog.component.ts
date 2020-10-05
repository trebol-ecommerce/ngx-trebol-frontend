import { Component, Inject, OnInit } from '@angular/core';
import { CompanyDetails } from 'src/app/data/models/CompanyDetails';
import { DATA_INJECTION_TOKENS } from 'src/app/data/data-injection-tokens';
import { SharedDataIService } from 'src/app/data/shared.data.iservice';
import { BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';
import { delay, mapTo, pluck, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-store-company-details-dialog',
  templateUrl: './store-company-details-dialog.component.html',
  styleUrls: ['./store-company-details-dialog.component.css']
})
export class StoreCompanyDetailsDialogComponent
  implements OnInit {

  private dataSource: Subject<CompanyDetails> = new ReplaySubject();

  public data$: Observable<CompanyDetails> = this.dataSource.asObservable();
  public loading$: Observable<boolean> = this.data$.pipe(mapTo(false), startWith(true));
  public name$: Observable<string> = this.data$.pipe(pluck('name'));
  public description$: Observable<string> = this.data$.pipe(pluck('description'));
  public bannerURL$: Observable<string> = this.data$.pipe(pluck('bannerImageURL'));
  public logoURL$: Observable<string> = this.data$.pipe(pluck('logoImageURL'));


  constructor(
    @Inject(DATA_INJECTION_TOKENS.shared) protected sharedDataService: SharedDataIService
  ) { }

  ngOnInit(): void {
    this.sharedDataService.readCompanyDetails().subscribe(
      companyDetails => { this.dataSource.next(companyDetails); }
    );
  }

}
