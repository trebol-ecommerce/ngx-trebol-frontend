/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { FormControl } from '@angular/forms';

export interface InputDialogData {
  title: string;
  hint: string;
  formControl: FormControl;
}
