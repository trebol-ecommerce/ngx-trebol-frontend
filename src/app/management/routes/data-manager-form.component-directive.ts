// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { DataManagerFormServiceDirective } from './data-manager-form.service-directive';
import { DataManagerFormDialogData } from './DataManagerFormDialogData';

export interface DataManagerFormComponentDirective<T> {
  data: DataManagerFormDialogData<T>;
  service: DataManagerFormServiceDirective<T>;
  saving$: Observable<boolean>;
  load(data: T): void;
  onSubmit(): void;
  onCancel(): void;
}
