import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const MATCH_PASSWORDS: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  if (password && confirmPassword && password.value !== confirmPassword.value) {
    return { passwordMismatch: true };
  }

  return null; // Les mots de passe sont identiques
};
