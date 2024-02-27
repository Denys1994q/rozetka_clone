import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ModalService } from 'src/app/modals/modal.service';
import { IProduct } from 'src/app/product/models/product.model';
import { CartService } from 'src/app/cart/services/cart.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-buy-btn',
  templateUrl: './buy-btn.component.html',
  styleUrls: ['./buy-btn.component.sass']
})
export class BuyBtnComponent implements OnInit, OnDestroy {
    @Input() textBtn!: boolean 
    @Input() product!: IProduct 
    isInCart!: boolean
    unsubscribe$ = new Subject<void>()

    constructor(private modalService: ModalService, private cartService: CartService) {}

    ngOnInit() {
        this.cartService.products$.pipe(takeUntil(this.unsubscribe$)).subscribe({
            next: products => {
                if (products) {
                    this.isInCart = products.findIndex((prod: IProduct) => prod._id === this.product._id) > -1
                }
            } 
        })
    }

    openModal() {
        this.modalService.openDialog('cart')
    }

    addToCart(product: IProduct) {
        if (this.isInCart) {
            this.cartService.removeFromCart(product._id)
        } else {
            this.cartService.addToShoppingCart({...product, amount: 1}) 
        }
    }

    ngOnDestroy() {
        this.unsubscribe$.next()
        this.unsubscribe$.complete()
    }

}
