import { Validator, NG_VALIDATORS, FormControl } from '@angular/forms'
import { Directive, OnInit } from '@angular/core';
 
@Directive({
  selector: '[emailPhoneValidator]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: emailPhoneValidatorDirective, multi: true }
  ]
})
export class emailPhoneValidatorDirective implements Validator, OnInit {
  ngOnInit() {
  }
 
  validate(c: FormControl) {
 
    let inpValue: string = c.value;
 
    if (inpValue.search(/[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}/)) {
      return { 'incorrectEmailPhone': true }
    }

    return null;
  }
}