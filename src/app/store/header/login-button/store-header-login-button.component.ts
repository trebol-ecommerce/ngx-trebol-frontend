import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StoreLoginFormDialogComponent } from '../../dialogs/login-form/store-login-form-dialog.component';

@Component({
  selector: 'app-store-header-login-button',
  templateUrl: './store-header-login-button.component.html',
  styleUrls: ['./store-header-login-button.component.css']
})
export class StoreHeaderLoginButtonComponent {

  constructor(
    protected dialogService: MatDialog
  ) { }

  public onClickLogIn(): void {
    this.dialogService.open(
      StoreLoginFormDialogComponent,
      {
        width: '24rem'
      }
    );
  }

}
