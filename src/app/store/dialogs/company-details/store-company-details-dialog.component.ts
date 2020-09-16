import { Component, Inject, OnInit } from '@angular/core';
import { CompanyDetails } from 'src/app/data/models/CompanyDetails';
import { DATA_INJECTION_TOKENS } from 'src/app/data/data-injection-tokens';
import { SharedDataIService } from 'src/app/data/shared.data.iservice';

@Component({
  selector: 'app-store-company-details-dialog',
  templateUrl: './store-company-details-dialog.component.html',
  styleUrls: ['./store-company-details-dialog.component.css']
})
export class StoreCompanyDetailsDialogComponent
  implements OnInit {

  public data: CompanyDetails;

  constructor(
    @Inject(DATA_INJECTION_TOKENS.shared) protected sharedDataService: SharedDataIService
  ) { }

  ngOnInit(): void {
    this.sharedDataService.readCompanyDetails().subscribe(d => { this.data = d; });
  }

}
