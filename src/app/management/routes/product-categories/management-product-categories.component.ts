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
import { ProductCategory } from 'src/models/entities/ProductCategory';
import { ProductCategoryFormComponent } from 'src/app/shared/components/product-category-form/product-category-form.component';
import { EntityFormDialogConfig } from 'src/app/shared/dialogs/entity-form/EntityFormDialogConfig';
import { TransactionalDataManagerComponentDirective } from '../../directives/transactional-data-manager.component-directive';
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

  loading = true;

  constructor(
    protected service: ManagementProductCategoriesService,
    private route: ActivatedRoute,
    protected dialogService: MatDialog
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

  protected createDialogProperties(item: ProductCategory): EntityFormDialogConfig<ProductCategory> {
    return {
      data: {
        item,
        formComponent: ProductCategoryFormComponent,
        service: this.service.dataService
      },
      width: '40rem'
    };
  }
}
