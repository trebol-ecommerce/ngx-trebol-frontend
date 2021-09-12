import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InformationDialogData } from './InformationDialogData';

@Component({
  selector: 'app-information-dialog',
  templateUrl: './information-dialog.component.html',
  styleUrls: ['./information-dialog.component.css']
})
export class InformationDialogComponent {

  public message: string | null;
  public action = 'OK';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: InformationDialogData
  ) {
    if (data?.message) {
      this.message = data.message;
    }
    if (data?.action) {
      this.action = data.action;
    }
  }

}
