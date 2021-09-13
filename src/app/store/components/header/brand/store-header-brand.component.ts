import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StoreCompanyDetailsDialogComponent } from 'src/app/store/dialogs/company-details/store-company-details-dialog.component';
import { APP_LONG_TITLE, APP_INITIALS_TITLE } from 'src/app/app.constants';

@Component({
  selector: 'app-store-header-brand',
  templateUrl: './store-header-brand.component.html',
  styleUrls: ['./store-header-brand.component.css']
})
export class StoreHeaderBrandComponent {

  public readonly desktopTitle: string = APP_LONG_TITLE;
  public readonly mobileTitle: string = APP_INITIALS_TITLE;

  constructor(
    protected dialogService: MatDialog
  ) { }

  public onClickViewCompanyDetails(): void {
    this.dialogService.open(
      StoreCompanyDetailsDialogComponent
    );
  }

}
