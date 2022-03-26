/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { ProductList } from 'src/models/entities/ProductList';
import { COMMON_DISMISS_BUTTON_LABEL, COMMON_ERROR_MESSAGE } from 'src/text/messages';
import { EntityFormDialogConfig } from '../../dialogs/entity-form/EntityFormDialogConfig';
import { ProductListContentsDialogComponent } from '../../dialogs/product-list-contents/product-list-contents-dialog.component';
import { ProductListContentsDialogData } from '../../dialogs/product-list-contents/ProductListContentsDialogData';
import { TransactionalDataManagerComponentDirective } from '../../directives/transactional-data-manager/transactional-data-manager.component.directive';
import { ManagementProductListsService } from './management-product-lists.service';

@Component({
  selector: 'app-management-product-lists',
  templateUrl: './management-product-lists.component.html',
  styleUrls: [
    '../data-manager.styles.css',
    './management-product-lists.component.css'
  ]
})
export class ManagementProductListsComponent
  extends TransactionalDataManagerComponentDirective<ProductList>
  implements OnInit {

  tableColumns = [ 'code', 'name', 'totalCount', 'actions' ];

  constructor(
    protected service: ManagementProductListsService,
    protected dialogService: MatDialog,
    protected route: ActivatedRoute,
    private snackBarService: MatSnackBar
  ) {
    super();
  }

  ngOnInit(): void {
    super.init(this.service);
  }

  onClickViewContents(list: ProductList) {
    const data: ProductListContentsDialogData = {
      list
    };
    this.dialogService.open(
      ProductListContentsDialogComponent,
      { data }
    );
  }

  onClickDelete(list: ProductList) {
    this.service.removeItems([list]).pipe(
      map(results => results[0]),
      catchError(error => {
        this.snackBarService.open(COMMON_ERROR_MESSAGE, COMMON_DISMISS_BUTTON_LABEL);
        return of(error);
      }),
      tap(() => {
        const successMessage = $localize`:Message of success after deleting a product list with name {{ name }}:Product list '${list.name}:name:' deleted`;
        this.snackBarService.open(successMessage, COMMON_DISMISS_BUTTON_LABEL);
        this.service.reloadItems();
      })
    ).subscribe();
  }

  protected createDialogProperties(item: ProductList): EntityFormDialogConfig<ProductList> {
    return {
      data: {
        item,
        entityType: 'productList',
        apiService: this.service.dataService
      },
      width: '40rem'
    };
  }

}
