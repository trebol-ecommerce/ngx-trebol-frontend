/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { MatDialogConfig } from '@angular/material/dialog';
import { EntityFormDialogData } from './EntityFormDialogData';

export class EntityFormDialogConfig<T>
  extends MatDialogConfig {

  data: EntityFormDialogData<T>;
}
