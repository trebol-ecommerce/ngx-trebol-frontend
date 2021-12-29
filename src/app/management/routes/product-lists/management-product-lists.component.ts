/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { ProductListFormComponent } from 'src/app/shared/components/product-list-form/product-list-form.component';
import { InformationDialogComponent } from 'src/app/shared/dialogs/information/information-dialog.component';
import { ProductList } from 'src/models/entities/ProductList';
import { COMMON_DISMISS_BUTTON_LABEL, COMMON_ERROR_MESSAGE, COMMON_WARNING_MESSAGE } from 'src/text/messages';
import { EntityFormDialogConfig } from '../../../shared/dialogs/entity-form/EntityFormDialogConfig';
import { ProductListContentsDialogComponent } from '../../dialogs/product-list-contents/product-list-contents-dialog.component';
import { ProductListContentsDialogData } from '../../dialogs/product-list-contents/ProductListContentsDialogData';
import { TransactionalDataManagerComponentDirective } from '../../directives/transactional-data-manager.component-directive';
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
    private snackBarService: MatSnackBar,
    private route: ActivatedRoute
  ) {
    super();
  }

  ngOnInit(): void {
    super.init(this.service);
    this.route.data.subscribe(
      d => {
        this.service.updateAccess(d.access);
        this.service.reloadItems();
      }
    );
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
      map(results => results[0])
    ).subscribe(
      success => {
        if (success) {
          const successMessage = $localize`:Message of success after deleting a product list with name {{ name }}:Product list '${list.name}:name:' deleted`;
          this.snackBarService.open(successMessage, COMMON_DISMISS_BUTTON_LABEL);
          this.service.reloadItems();
        } else {
          this.snackBarService.open(COMMON_WARNING_MESSAGE, COMMON_DISMISS_BUTTON_LABEL);
        }
      },
      error => {
        this.snackBarService.open(COMMON_ERROR_MESSAGE, COMMON_DISMISS_BUTTON_LABEL);
      }
    );
  }

  protected createDialogProperties(item: ProductList): EntityFormDialogConfig<ProductList> {
    return {
      data: {
        item,
        formComponent: ProductListFormComponent,
        service: this.service.dataService
      },
      width: '40rem'
    };
  }

}
