// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Directive } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { AbstractEntity } from 'src/app/models/AbstractEntity';
import { DataManagerFormServiceDirective } from './data-manager-form.service-directive';
import { DataManagerFormDialogData } from './DataManagerFormDialogData';

/**
 * Base class for data form component templates.
 */
@Directive()
export abstract class DataManagerFormComponentDirective<T> {
  protected abstract data: DataManagerFormDialogData<T>;
  protected abstract service: DataManagerFormServiceDirective<T>;
  public abstract saving$: Observable<boolean>;
  public abstract formGroup: FormGroup;
  public abstract dialogTitle: string;
  protected abstract load(item: T): void;
  public abstract asItem(): T;
  public abstract onSubmit(): void;
  public abstract onCancel(): void;
}
