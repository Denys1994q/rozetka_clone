import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { CommentsModalComponent } from './comments-modal/comments-modal.component';
import { FiltersModalComponent } from './filters-modal/filters-modal.component';
import { LoginModalComponent } from './login-modal/login-modal.component';
import { ProductsModalComponent } from './products-modal/products-modal.component';
import { RegisterModalComponent } from './register-modal/register-modal.component';
import { ServicesModalComponent } from './services-modal/services-modal.component';
import { CartModalComponent } from './cart-modal/cart-modal.component';

import { passAllowedNamesValidatorDirective } from './pass-allowed-names-validator.directive';
import { passBigLettersValidatorDirective } from './pass-bigLetters-validator.directive';
import { passDigitsValidatorDirective } from './pass-digits-validator.directive';
import { emailPhoneValidatorDirective } from './email-phone-validator.directive';
import { NgxMaskPipe, NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@NgModule({
  declarations: [
    CommentsModalComponent,
    FiltersModalComponent,
    LoginModalComponent,
    ProductsModalComponent,
    RegisterModalComponent,
    ServicesModalComponent,
    CartModalComponent,
    passAllowedNamesValidatorDirective,
    passDigitsValidatorDirective,
    passBigLettersValidatorDirective,
    emailPhoneValidatorDirective,
  ],
  imports: [
    NgxMaskDirective,
    NgxMaskPipe,
    SharedModule,
  ],
  providers: [provideNgxMask()],
  exports: [
    CommentsModalComponent,
    FiltersModalComponent,
    LoginModalComponent,
    ProductsModalComponent,
    RegisterModalComponent,
    ServicesModalComponent,
    CartModalComponent
  ]
})
export class ModalModule { }
