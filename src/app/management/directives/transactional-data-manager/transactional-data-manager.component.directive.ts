/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Directive } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { EntityFormDialogComponent } from '../../dialogs/entity-form/entity-form-dialog.component';
import { EntityFormDialogConfig } from '../../dialogs/entity-form/EntityFormDialogConfig';
import { DataManagerComponentDirective } from '../data-manager/data-manager.component.directive';

/**
 * Base for data manager template components.
 * Implement createDialogProperties() to view/edit data
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
