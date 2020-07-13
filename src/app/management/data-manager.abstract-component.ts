import { OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { finalize, map, tap } from 'rxjs/operators';
import { AbstractEntity } from 'src/data/models/AbstractEntity';
import { DataManagerAbstractService } from './data-manager.abstract-service';

export abstract class DataManagerAbstractComponent<T extends AbstractEntity>
  implements OnInit {

  protected abstract service: DataManagerAbstractService<T>;
  protected abstract dialogService: MatDialog;
  public abstract tableColumns: string[];

  public loading$: Observable<boolean>;
  public busy$: Observable<boolean>;
  public items$: Observable<T[]>;

  ngOnInit(): void {
    this.loading$ = this.service.loading$.pipe();
    this.busy$ = this.service.focusedItems$.pipe(map(items => items?.length > 0));
    this.items$ = this.service.items$.pipe();

    this.service.reloadItems();
  }

  public abstract openFormDialog(item: T): Observable<T>;

  protected edit(item: T): Observable<T> {
    this.service.focusedItems = [item];
    return this.openFormDialog(item).pipe(
      tap(
        (result) => {
          if (!!result) {
            this.service.reloadItems();
          }
        }
      )
    );
  }

  public onClickEdit(item: T): void {
    this.edit(item).subscribe();
  }

  public onClickAdd(): void {
    this.edit(undefined).subscribe();
  }

  public onClickDelete(item: T): void {
    throw Error('Operación no soportada.');
  }

}
