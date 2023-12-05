import { Validator, NG_VALIDATORS, FormControl } from '@angular/forms'
import { Directive } from '@angular/core';
 
@Directive({
  selector: '[passBigLetters]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: passBigLettersValidatorDirective, multi: true }
  ]
})
export class passBigLettersValidatorDirective implements Validator {
 
  validate(c: FormControl) {
    let inpValue: string = c.value;
    if (!inpValue) {
      return null
    } else {
      if (inpValue.search(/(?=.*[A-Z])/)) {
        return { 'noBigLettersInPass': true }
      }
    }
    return null;
  }

}