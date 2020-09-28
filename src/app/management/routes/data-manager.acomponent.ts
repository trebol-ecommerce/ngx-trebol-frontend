import { Directive, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AbstractEntity } from 'src/app/data/models/AbstractEntity';
import { DataManagerService } from './data-manager.aservice';

@Directive()
export abstract class DataManagerComponent<T extends AbstractEntity> {

  protected abstract service: DataManagerService<T>;
  public abstract tableColumns: string[];

  public loading$: Observable<boolean>;
  public busy$: Observable<boolean>;
  public items$: Observable<T[]>;
  public canEdit$: Observable<boolean>;
  public canAdd$: Observable<boolean>;
  public canDelete$: Observable<boolean>;

  init(service: DataManagerService<T>): void {
    this.loading$ = service.loading$.pipe();
    this.busy$ = service.focusedItems$.pipe(map(items => items?.length > 0));
    this.items$ = service.items$.pipe();
    this.canEdit$ = service.canEdit$.pipe();
    this.canAdd$ = service.canAdd$.pipe();
    this.canDelete$ = service.canDelete$.pipe();
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
