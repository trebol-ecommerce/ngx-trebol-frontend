import { AbstractEntity } from 'src/data/models/AbstractEntity';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { EntityDataIService } from 'src/data/services/entity.data.iservice';

export abstract class DataItemFormAbstractComponent<T extends AbstractEntity> {
  protected abstract itemId: number;
  protected abstract dataService: EntityDataIService<T>;
  public abstract saving$: Observable<boolean>;
  public abstract formGroup: FormGroup;
  public abstract dialogTitle: string;
  protected abstract load(item: T): void;
  public abstract asItem(): T;
  public abstract onSubmit(): void;
  public abstract onCancel(): void;
}
