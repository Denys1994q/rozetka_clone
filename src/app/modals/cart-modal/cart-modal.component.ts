import { Component, OnInit } from '@angular/core';
import { ModalService } from '../modal.service';
import { CartService } from 'src/app/cart/services/cart.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { OrdersService } from 'src/app/cabinet/services/orders.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.component.html',
  styleUrls: ['./cart-modal.component.sass']
})
export class CartModalComponent implements OnInit {
    openedForDeleting!: string | null

    constructor(
        public modalService: ModalService, 
        private authService: AuthService,
        private ordersService: OrdersService,
        private router: Router,
        public cartService: CartService) 
    {}

    addToOpenedToDelete(id: string) {
        this.openedForDeleting = id
    }

    removeFromOpenedToDelete(e: any) {
        if (e.target.classList.contains('modal-login__close') || e.target.classList.contains('more-block')) {
            return
        } else {
            this.openedForDeleting = null
        }
    }

    ngOnInit() {
        this.cartService.getCart()
    }

    onCounterChange(event: { productId: number; value: number }) {
        this.cartService.findAndUdpate(event.productId, event.value)
    }

    getPrice(product: any) {
        let price: any;
        product.searchStatus.map((status: any) => {
            if (status.searchPosition === 'price') {
                price = status
            }
        })
        return price
    }

    confirmOrder() {
        const currentRoute = this.router.url;
        if (currentRoute !== '/checkout') {
            this.router.navigate(['/checkout']);
        } else {
            if (this.authService.isAuthenticated()) {
                this.cartService.productsFromStorage.map(item => {
                    this.ordersService.addToOrdersList(item._id).subscribe({
                        next: response => this.cartService.setOrderConfirmed(true),
                        error: err => console.log(err),
                        complete: () => {
                            this.cartService.clearCart()
                            this.modalService.closeDialog()
                        } 
                    })
                })
            } else {
                this.cartService.setOrderConfirmed(true)
                this.modalService.closeDialog()
                this.cartService.clearCart()
            }
        }
    }

}