import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { ModalService } from 'src/app/modals/modal.service';
import { OrdersService } from 'src/app/cabinet/services/orders.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.sass']
})
export class CheckoutPage {
    orderConfirmed: boolean = false

    constructor(
        public cartService: CartService, 
        private ordersService: OrdersService,
        private authService: AuthService,
        public modalService: ModalService) {}

    ngOnInit() {
        this.cartService.setOrderConfirmed(false)
        this.modalService.closeDialog()
    }

    getPrice(product: any) {
        let price: any = 0;
        product.searchStatus.map((status: any) => {
            if (status.searchPosition === 'price') {
                price = status
            }
        })
        return price
    }

    confirmOrder() {
        if (this.authService.isAuthenticated()) {
            this.cartService.productsFromStorage.map(item => {
                this.ordersService.addToOrdersList(item._id).subscribe({
                    next: response => this.cartService.setOrderConfirmed(true),
                    error: err => console.log(err),
                    complete: () => this.cartService.clearCart()
                })
            })
        } else {
            this.cartService.setOrderConfirmed(true)
            this.cartService.clearCart()
        }
    }

}