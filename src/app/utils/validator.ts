import { AbstractControl, ValidationErrors } from '@angular/forms';

/**
 *
 * @param fieldName
 * @param comparingFieldName
 * @returns
 */
export function passwordMatch(fieldName: string, comparingFieldName: string) {

  return (c: AbstractControl): ValidationErrors | null => {
    if (!c.parent || !c) { return null; }
    const pwd = c.parent.get(fieldName);
    const cpwd = c.parent.get(comparingFieldName);
    if (!pwd || !cpwd) { return null; }
    if (pwd.value !== cpwd.value) {
      return { valid: false };
    }
};
}
