import { Validator, NG_VALIDATORS, FormControl } from '@angular/forms'
import { Directive, OnInit } from '@angular/core';
 
@Directive({
  selector: '[passDigitsValidator]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: passDigitsValidatorDirective, multi: true }
  ]
})
export class passDigitsValidatorDirective implements Validator {

  validate(c: FormControl) {
    let inpValue: string = c.value;
    if (!inpValue) {
      return null
    } else {
      if (inpValue.search(/(?=.*[0-9])/)) {
        return { 'noDigitsInPass': true }
      }
    }
    return null;
  }
}