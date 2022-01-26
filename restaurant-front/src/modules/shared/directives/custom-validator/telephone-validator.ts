import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function telephoneValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null;
    }

    if (/^\d+$/.test(value)){
        return null;
    }

    return {telephone : {invalid: true} };
  };
}