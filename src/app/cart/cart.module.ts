import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { CartNotificationComponent } from './components/cart-notification/cart-notification.component';
import { CheckoutPage } from './pages/checkout/checkout.component';
import { RouterModule } from '@angular/router';

const routes = [
  {path: '', component: CheckoutPage}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MatIconModule,
    MatBadgeModule
  ],
  declarations: [
    CartNotificationComponent,
    CheckoutPage
  ],
  exports: [
    CartNotificationComponent,
    CheckoutPage
  ]

})
export class CartModule { }
