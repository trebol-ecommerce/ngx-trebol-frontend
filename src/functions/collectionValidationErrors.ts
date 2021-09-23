/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { FormGroup, ValidationErrors, AbstractControl } from '@angular/forms';

export function collectValidationErrors(abstractControl: AbstractControl): ValidationErrors {
  if (abstractControl.valid) {
    return null;
  }

  if (abstractControl instanceof FormGroup){
    let errors = {};
    const controls = abstractControl.controls;
    for (const controlName in controls) {
      if (Object.hasOwnProperty(controlName)) {
        errors = addControlErrors(errors, abstractControl, controlName);
      }
    }
    return errors;
  } else {
    return abstractControl.errors;
  }
}

function addControlErrors(allErrors: any, formGroup: FormGroup, controlName: string) {
  const errors = {...allErrors};
  const controlErrors = formGroup.get(controlName).errors;
  if (controlErrors) {
    errors[controlName] = controlErrors;
  }
  return errors;
}
