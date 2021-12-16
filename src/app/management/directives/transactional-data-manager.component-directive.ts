/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Directive, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { EntityFormDialogComponent } from '../../shared/dialogs/entity-form-dialog/entity-form-dialog.component';
import { EntityFormDialogConfig } from '../../shared/dialogs/entity-form-dialog/EntityFormDialogConfig';
import { DataManagerComponentDirective } from './data-manager.component-directive';

/**
 * Base  for data manager template components.
 * Implement openFormDialog() to view/edit data
 */
@Directive()
export abstract class TransactionalDataManagerComponentDirective<T>
  extends DataManagerComponentDirective<T> {

  protected abstract dialogService: MatDialog;

  onClickEdit(item: T): void {
    this.edit(item).subscribe();
  }

  onClickAdd(): void {
    this.edit(undefined).subscribe();
  }

  protected abstract createDialogProperties(item: T | undefined): EntityFormDialogConfig<T>;

  protected edit(item: T | undefined): Observable<T> {
    this.service.focusedItems = [item];
    return this.dialogService.open(
      EntityFormDialogComponent,
      this.createDialogProperties(item)
    ).afterClosed().pipe(
      tap(result => {
        this.service.focusedItems = [];
        if (!!result) { // truthy
          this.service.reloadItems();
        }
      })
    );
  }

}
