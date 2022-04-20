/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { of, Subscription } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { Product } from 'src/models/entities/Product';
import { COMMON_DISMISS_BUTTON_LABEL, COMMON_ERROR_MESSAGE } from 'src/text/messages';
import { EntityFormDialogConfig } from '../../dialogs/entity-form/EntityFormDialogConfig';
import { TransactionalDataManagerComponentDirective } from '../../directives/transactional-data-manager/transactional-data-manager.component.directive';
import { ManagementProductsService } from './management-products.service';

@Component({
  selector: 'app-management-products',
  templateUrl: './management-products.component.html',
  styleUrls: [
    '../data-manager.styles.css',
    './management-products.component.css'
  ]
})
export class ManagementProductsComponent
  extends TransactionalDataManagerComponentDirective<Product>
  implements OnInit, OnDestroy {

  private actionSubscription: Subscription;

  tableColumns = [ 'name', 'barcode', 'price', 'actions' ];
  // tableColumns = [ 'name', 'barcode', 'price', 'currentStock', 'criticalStock', 'actions' ];

  constructor(
    protected service: ManagementProductsService,
    protected dialogService: MatDialog,
    protected route: ActivatedRoute,
    private snackBarService: MatSnackBar
  ) {
    super();
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    this.actionSubscription?.unsubscribe();
  }

  protected createDialogProperties(item: Product): EntityFormDialogConfig<Product> {
    return {
      data: {
        isNewItem: !item,
        item,
        entityType: 'product',
        apiService: this.service.dataService
      },
      width: '40rem',
      maxHeight: '80vh'
    };
  }

  onClickDelete(prod: Product) {
    this.actionSubscription?.unsubscribe();
    this.actionSubscription = this.service.removeItems([prod]).pipe(
      switchMap(() => this.service.reloadItems()),
      tap(
        () => {
          const message = $localize`:Message of success after deleting a product with name {{ name }}:Product '${prod.name}:name:' deleted`;
          this.snackBarService.open(message, COMMON_DISMISS_BUTTON_LABEL);
        },
        () => {
          this.snackBarService.open(COMMON_ERROR_MESSAGE, COMMON_DISMISS_BUTTON_LABEL);
        }
      )
    ).subscribe();
  }

}
