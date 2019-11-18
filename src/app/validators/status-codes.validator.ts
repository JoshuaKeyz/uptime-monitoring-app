import { ValidatorFn, ValidationErrors, FormControl } from '@angular/forms';

export const statusCodeValidator: ValidatorFn = (control: FormControl): ValidationErrors | null => {
  return control.value.length < 0 ? { 'noStatusCodes': true} : null
};