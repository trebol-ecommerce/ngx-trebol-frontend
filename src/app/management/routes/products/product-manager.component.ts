import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Product } from 'src/data/models/entities/Product';
import { ERR_SRV_COMM_MSG } from 'src/text/messages';
import { DataManagerAbstractComponent } from '../../data-manager.abstract-component';
import { ProductManagerFormDialogComponent, ProductManagerFormDialogData } from './form-dialog/product-manager-form-dialog.component';
import { ProductManagerService } from './product-manager.service';

@Component({
  selector: 'app-product-manager',
  templateUrl: './product-manager.component.html',
  styleUrls: []
})
export class ProductManagerComponent
  extends DataManagerAbstractComponent<Product> {

  public tableColumns: string[] = [ 'nombre', 'codigo', 'precio', 'stockActual', 'stockCritico', 'tipo', 'acciones' ];

  constructor(
    protected service: ProductManagerService,
    protected dialogService: MatDialog,
    protected snackBarService: MatSnackBar
  ) {
    super();
  }

  public openFormDialog(item: Product): Observable<Product> {
    const dialogData: ProductManagerFormDialogData = {
      product: item
    };

    return this.dialogService.open(
      ProductManagerFormDialogComponent,
      {
        width: '40rem',
        data: dialogData
      }
    ).afterClosed();
  }

  public onClickDelete(prod: Product) {
    this.service.removeItems([prod]).pipe(r => r[0]).subscribe(
      (exito: boolean) => {
        if (exito) {
          this.snackBarService.open('Producto \'' + prod.name + '\' eliminado.');
          this.service.reloadItems();
        } else {
          this.snackBarService.open(ERR_SRV_COMM_MSG, 'OK', { duration: -1 });
        }
      },
      () => {
        this.snackBarService.open(ERR_SRV_COMM_MSG, 'OK', { duration: -1 });
      }
    );
  }

}
