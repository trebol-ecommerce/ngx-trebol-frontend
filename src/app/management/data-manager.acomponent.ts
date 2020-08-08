import { OnInit, Directive } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { finalize, map, tap } from 'rxjs/operators';
import { AbstractEntity } from 'src/data/models/AbstractEntity';
import { DataManagerService } from './data-manager.aservice';

@Directive()
export abstract class DataManagerComponent<T extends AbstractEntity>
  implements OnInit {

  protected abstract service: DataManagerService<T>;
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
          this.service.focusedItems = [];
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
