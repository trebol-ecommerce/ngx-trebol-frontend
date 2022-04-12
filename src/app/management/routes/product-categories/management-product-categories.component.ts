/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthorizationService } from 'src/app/authorization.service';
import { EntityFormDialogConfig } from 'src/app/management/dialogs/entity-form/EntityFormDialogConfig';
import { AuthorizedAccess } from 'src/models/AuthorizedAccess';
import { ProductCategory } from 'src/models/entities/ProductCategory';
import { TransactionalDataManagerComponentDirective } from '../../directives/transactional-data-manager/transactional-data-manager.component.directive';
import { ManagementProductCategoriesService } from './management-product-categories.service';

@Component({
  selector: 'app-management-product-categories',
  templateUrl: './management-product-categories.component.html',
  styleUrls: [
    '../data-manager.styles.css',
    './management-product-categories.component.css'
  ]
})
export class ManagementProductCategoriesComponent
  extends TransactionalDataManagerComponentDirective<ProductCategory>
  implements OnInit {

  actions$: Observable<string[]>;
  loading = true;

  constructor(
    protected service: ManagementProductCategoriesService,
    protected dialogService: MatDialog,
    protected route: ActivatedRoute,
    protected authorizationService: AuthorizationService
  ) {
    super();
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  protected createDialogProperties(item: ProductCategory): EntityFormDialogConfig<ProductCategory> {
    return {
      data: {
        item,
        entityType: 'productCategory',
        apiService: this.service.dataService
      },
      width: '40rem'
    };
  }
}
