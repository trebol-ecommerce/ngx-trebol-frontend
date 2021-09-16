import { FormGroup } from '@angular/forms';

export interface FormGroupOwner {
  formGroup: FormGroup;
  onParentFormTouched(): void;
}
