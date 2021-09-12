import { FormGroup, ValidationErrors } from "@angular/forms";

export function validateFormGroup(formGroup: FormGroup): ValidationErrors {
  if (formGroup.valid) {
    return null;
  }
  let errors = {};
  for (const controlName in formGroup.controls) {
    errors = addControlErrors(errors, formGroup, controlName);
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
