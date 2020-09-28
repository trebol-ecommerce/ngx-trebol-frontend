import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from 'src/app/data/models/entities/Product';
import { COMMON_WARNING_MESSAGE, UNKNOWN_ERROR_MESSAGE } from 'src/text/messages';
import { DataManagerComponent } from '../data-manager.acomponent';
import { ProductManagerFormDialogComponent, ProductManagerFormDialogData } from './form-dialog/product-manager-form-dialog.component';
import { ProductManagerService } from './product-manager.service';

@Component({
  selector: 'app-product-manager',
  templateUrl: './product-manager.component.html',
  styleUrls: [
    '../data-manager.styles.css',
    './product-manager.component.css'
  ]
})
export class ProductManagerComponent
  extends DataManagerComponent<Product>
  implements OnInit {

  public tableColumns: string[] = [ 'name', 'barcode', 'price', 'currentStock', 'criticalStock', 'actions' ];

  constructor(
    protected service: ProductManagerService,
    protected dialogService: MatDialog,
    protected snackBarService: MatSnackBar,
    protected route: ActivatedRoute
  ) {
    super();
  }

  ngOnInit(): void {
    this.route.data.subscribe(
      d => {
        this.service.updateAccess(d.access); 
        this.service.reloadItems();
      }
    );
  }

  public openFormDialog(product: Product): Observable<Product> {
    const dialogData: ProductManagerFormDialogData = { product };

    return this.dialogService.open(
      ProductManagerFormDialogComponent,
      {
        width: '40rem',
        data: dialogData
      }
    ).afterClosed();
  }

  public onClickDelete(prod: Product) {
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
