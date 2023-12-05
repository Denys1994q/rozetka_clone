import { Validator, NG_VALIDATORS, FormControl } from '@angular/forms'
import { Directive, OnInit, forwardRef, Input } from '@angular/core';
 
@Directive({
  selector: '[passAllowedNamesValidator]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: passAllowedNamesValidatorDirective, multi: true }
  ]
})
export class passAllowedNamesValidatorDirective implements Validator, OnInit {
  @Input("passValName") passValName!: string
  @Input("passValMail") passValMail!: string
  ngOnInit() {
  }
 
  validate(c: FormControl) {
    let inpValue: string = c.value;
    if (inpValue === this.passValName || inpValue === this.passValMail) {
      return { 'forbiddenPassword': true }
    }

    return null;
  }
}