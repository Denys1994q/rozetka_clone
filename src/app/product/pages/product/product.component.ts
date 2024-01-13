import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CartService } from 'src/app/cart/services/cart.service';
import { IProduct } from '../../models/product.model';
import { ModalService } from 'src/app/modals/modal.service';
import { RecentlyViewedService } from 'src/app/cabinet/services/recently-viewed.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { WishlistService } from 'src/app/cabinet/services/wishlist.service';
import { ActivatedRoute } from '@angular/router';
import { DeviceService } from 'src/app/core/services/device.service';
import { ScrollService } from 'src/app/core/services/scroll.service';
import { Observable, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.sass']
})
export class ProductComponent {
    product$!: Observable<IProduct | null>
    loading$!: Observable<boolean>
    error$!: Observable<boolean>
    unsubscribe$ = new Subject()

    constructor(
        public deviceService: DeviceService,
        public route:ActivatedRoute, 
        public productService: ProductService, 
        private authService: AuthService,
        private wishlistService: WishlistService,
        public cartService: CartService,
        public modalService: ModalService,
        private recentlyViewedService: RecentlyViewedService,
        private scrollService: ScrollService) {
            this.product$ = this.productService.product$
            this.loading$ = this.productService.getOneProductLoading$
            this.error$ = this.productService.getOneProductError$
        }

    ngOnInit() {
        this.route.params.subscribe(params => {
            const productId = params['productId'];
            this.productService.getCurrentProduct(productId)

            this.recentlyViewedService.addToRecentlyViewedProds(productId).pipe(takeUntil(this.unsubscribe$)).subscribe({
                next: () => {},
                error: err => console.log(err)
            })
        })
    }

    ngAfterViewInit() {
        this.scrollService.scrollToTop()
    }

    addToCart(product: IProduct) {
        this.cartService.addToShoppingCart({...product, amount: 1})  
    }

    onAddToWishlist(product: IProduct) {
        if (!this.authService.isAuthenticated()) {
            this.modalService.openDialog('login');
        }
        try {
            if (product.isInWishlist) {
                this.wishlistService.removeFromWishlist([product._id]).pipe(takeUntil(this.unsubscribe$)).subscribe({
                    next: () => this.productService.updateProductWishlistStatus(false),
                    error: err => console.log(err)
                })
            } else {
                this.wishlistService.addToWishlist(product._id).pipe(takeUntil(this.unsubscribe$)).subscribe({
                    next: () => this.productService.updateProductWishlistStatus(true),
                    error: err => console.log(err)
                })
            }
        } catch (error) {
            console.error(error); 
        }
    }

    ngOnDestroy() {
        this.productService.resetProduct()
    }
 
}
