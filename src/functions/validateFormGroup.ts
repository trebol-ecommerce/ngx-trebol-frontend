import { FormGroup, ValidationErrors } from '@angular/forms';

export function validateFormGroup(formGroup: FormGroup): ValidationErrors {
  if (formGroup.valid) {
    return null;
  }
  let errors = {};
  const controls = formGroup.controls;
  for (const controlName in controls) {
    if (Object.hasOwnProperty(controlName)) {
      errors = addControlErrors(errors, formGroup, controlName);
    }
  }
  return errors;
}

function addControlErrors(allErrors: any, formGroup: FormGroup, controlName: string) {
  const errors = {...allErrors};
  const controlErrors = formGroup.get(controlName).errors;
  if (controlErrors) {
    errors[controlName] = controlErrors;
  }
  return errors;
}
