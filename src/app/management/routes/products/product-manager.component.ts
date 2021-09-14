// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Product } from 'src/app/models/entities/Product';
import { COMMON_WARNING_MESSAGE, UNKNOWN_ERROR_MESSAGE } from 'src/text/messages';
import { DataManagerFormDialogConfig } from '../../dialogs/data-manager-form-dialog/DataManagerFormDialogConfig';
import { TransactionalDataManagerComponentDirective } from '../../directives/transactional-data-manager.component-directive';
import { ProductManagerService } from './product-manager.service';
import { ProductFormComponent } from 'src/app/shared/components/product-form/product-form.component';

@Component({
  selector: 'app-product-manager',
  templateUrl: './product-manager.component.html',
  styleUrls: [
    '../data-manager.styles.css',
    './product-manager.component.css'
  ]
})
export class ProductManagerComponent
  extends TransactionalDataManagerComponentDirective<Product>
  implements OnInit {

  tableColumns: string[] = [ 'name', 'barcode', 'price', 'currentStock', 'criticalStock', 'actions' ];

  constructor(
    protected service: ProductManagerService,
    protected dialogService: MatDialog,
    protected snackBarService: MatSnackBar,
    protected route: ActivatedRoute
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

  protected createDialogProperties(item: Product | undefined): DataManagerFormDialogConfig<Product> {
    const realItem = ( item ? item : new Product() );
    const title = ( item ? 'Editar' : 'Nuevo' ) + ' Producto';
    return {
      data: {
        item: realItem,
        formComponent: ProductFormComponent,
        service: this.service.dataService,
        title
      },
      width: '40rem',
      maxHeight: '80vh'
    };
  }

  onClickDelete(prod: Product) {
    this.service.removeItems([prod]).pipe(
      map(results => results[0])
    ).subscribe(
      success => {
        if (success) {
          this.snackBarService.open(`Producto ${prod.name} eliminado`, 'OK');
          this.service.reloadItems();
        } else {
          this.snackBarService.open(COMMON_WARNING_MESSAGE, 'OK');
        }
      },
      error => {
        this.snackBarService.open(UNKNOWN_ERROR_MESSAGE, 'OK');
      }
    );
  }

}
