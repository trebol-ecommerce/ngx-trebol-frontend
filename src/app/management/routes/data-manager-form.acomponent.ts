import { Directive } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { AbstractEntity } from 'src/app/data/models/AbstractEntity';
import { DataManagerFormService } from './data-manager-form.aservice';

@Directive()
export abstract class DataManagerFormComponent<T extends AbstractEntity> {
  protected abstract itemId: number;
  protected abstract service: DataManagerFormService<T>;
  public abstract saving$: Observable<boolean>;
  public abstract formGroup: FormGroup;
  public abstract dialogTitle: string;
  protected abstract load(item: T): void;
  public abstract asItem(): T;
  public abstract onSubmit(): void;
  public abstract onCancel(): void;
}
