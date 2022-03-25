/*
 * Copyright (c) 2022 The Trebol eCommerce Project
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
