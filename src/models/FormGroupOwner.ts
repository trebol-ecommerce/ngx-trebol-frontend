/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { FormGroup } from '@angular/forms';

export interface FormGroupOwner {
  formGroup: FormGroup;
  onParentFormTouched(): void;
}
