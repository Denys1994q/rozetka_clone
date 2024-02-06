import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
    selector: 'app-cart-notification',
    templateUrl: './cart-notification.component.html',
    styleUrls: ['./cart-notification.component.sass']
})
export class CartNotificationComponent {
    products$ = this.cartService.products$
    totalProductsNumber$ = this.cartService.totalProductsNumber$
    totalPrice$ = this.cartService.totalPrice$
    
    constructor(private cartService: CartService) {}

}