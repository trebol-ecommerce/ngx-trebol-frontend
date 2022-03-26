/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, Input, Type } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-switcher-button',
  templateUrl: './dialog-switcher-button.component.html',
  styleUrls: ['./dialog-switcher-button.component.css']
})
export class DialogSwitcherButtonComponent {

  @Input() public label: string;
  @Input() public sourceDialogRef: MatDialogRef<any>;
  @Input() public targetDialogComponent: Type<any>;
  @Input() public targetDialogConfig: MatDialogConfig<any>;

  constructor(
    protected dialogService: MatDialog
  ) {
  }

  public onClick(): void {
    this.sourceDialogRef.close();
    this.dialogService.open(
      this.targetDialogComponent,
      this.targetDialogConfig
    );
  }

}
