import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { ModalService } from 'src/app/modals/modal.service';
import { OrdersService } from 'src/app/cabinet/services/orders.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { IProductCart } from 'src/app/product/models/product.model';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.sass']
})
export class CheckoutPage {
    orderConfirmed: boolean = false
    totalProductsNumber$ = this.cartService.totalProductsNumber$
    products$ = this.cartService.products$
    isOrderConfirmed$ = this.cartService.isOrderConfirmed$

    constructor(
        public cartService: CartService, 
        private ordersService: OrdersService,
        private authService: AuthService,
        public modalService: ModalService) {}

    ngOnInit() {
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

    confirmOrder(products: IProductCart[]) {
        if (this.authService.isAuthenticated()) {
            products.map(item => {
                this.ordersService.addToOrdersList(item._id).subscribe({
                    next: response => this.cartService.setOrderConfirmed(),
                    error: err => console.log(err)
                })
            })
        } else {
            this.cartService.setOrderConfirmed()
        }
    }

}