// Copyright (c) 2020 Benjamin
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { AbstractControl } from '@angular/forms';

export function passwordMatcher(c: AbstractControl): { [key: string]: boolean } | null {
  const emailControl = c.get('pass1');
  const confirmControl = c.get('pass2');

  if (emailControl.pristine || confirmControl.pristine) {
    return null;
  }

  if (emailControl.value === confirmControl.value) {
    return null;
  }
  return { match: true };
}
