import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from '../carousel/carousel.module';
import { CommentsModalComponent } from './comments-modal/comments-modal.component';
import { FiltersModalComponent } from './filters-modal/filters-modal.component';
import { LoginModalComponent } from './login-modal/login-modal.component';
import { ProductsModalComponent } from './products-modal/products-modal.component';
import { RegisterModalComponent } from './register-modal/register-modal.component';
import { ServicesModalComponent } from './services-modal/services-modal.component';
import { CartModalComponent } from './cart-modal/cart-modal.component';
import {MatDialogModule} from '@angular/material/dialog';
import { passAllowedNamesValidatorDirective } from './pass-allowed-names-validator.directive';
import { passBigLettersValidatorDirective } from './pass-bigLetters-validator.directive';
import { passDigitsValidatorDirective } from './pass-digits-validator.directive';
import { emailPhoneValidatorDirective } from './email-phone-validator.directive';
import { NgxMaskPipe, NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { MatIconModule } from '@angular/material/icon';
import { ErrorComponent } from './error/error.component';
import { RouterModule } from '@angular/router';
import { CounterComponent } from './counter/counter.component';
import { CommentModule } from '../comment/comment.module';
import { InputsModule } from '../inputs/inputs.module';

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
    ErrorComponent,
    CounterComponent
  ],
  imports: [
    CommonModule,
    InputsModule,
    RouterModule,
    MatIconModule,
    NgxMaskDirective,
    NgxMaskPipe,
    CarouselModule,
    CommentModule,
    MatDialogModule, 
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
