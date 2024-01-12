import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { SearchResultsService } from 'src/app/categories/services/search-results.service';
import { CartService } from 'src/app/cart/services/cart.service';
import { IProduct } from '../../models/product.model';
import { ModalService } from 'src/app/modals/modal.service';
import { RecentlyViewedService } from 'src/app/cabinet/services/recently-viewed.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { WishlistService } from 'src/app/cabinet/services/wishlist.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DeviceService } from 'src/app/core/services/device.service';
import { ScrollService } from 'src/app/core/services/scroll.service';
import { Observable, Subject, takeUntil } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.sass']
})
export class ProductComponent {
    product: IProduct | null = null
    loading$!: Observable<boolean>
    error$!: Observable<boolean>
    unsubscribe$ = new Subject()

    constructor(
        public deviceService: DeviceService,
        private router: Router, 
        public route:ActivatedRoute, 
        public ProductService: ProductService, 
        private authService: AuthService,
        private wishlistService: WishlistService,
        public SearchResultsService: SearchResultsService,
        public cartService: CartService,
        public modalService: ModalService,
        private recentlyViewedService: RecentlyViewedService,
        private scrollService: ScrollService) {
            this.ProductService.product$.pipe(takeUntilDestroyed()).subscribe(prod => {
                this.product = prod
            })
            this.loading$ = this.ProductService.getOneProductLoading$
            this.error$ = this.ProductService.getOneProductError$
        }

    ngOnInit() {
        this.route.params.subscribe(params => {
            const productId = params['productId'];
            this.ProductService.getCurrentProduct(productId)

            this.recentlyViewedService.addToRecentlyViewedProds(productId).pipe(takeUntil(this.unsubscribe$)).subscribe({
                next: () => {},
                error: err => console.log(err)
            })
        })
    }

    ngAfterViewInit() {
        this.scrollService.scrollToTop()
    }

    addToCart() {
        this.cartService.addToShoppingCart({...this.product, amount: 1})  
    }

    onAddToWishlist(productId: string) {
        if (!this.authService.isAuthenticated()) {
            this.modalService.openDialog('login');
        }
        try {
            if (this.product?.isInWishlist) {
                this.wishlistService.removeFromWishlist([productId]).pipe(takeUntil(this.unsubscribe$)).subscribe({
                    next: resp => this.ProductService.updateProductWishlistStatus(false),
                    error: err => console.log(err)
                })
            } else {
                this.wishlistService.addToWishlist(productId).pipe(takeUntil(this.unsubscribe$)).subscribe({
                    next: resp => this.ProductService.updateProductWishlistStatus(true),
                    error: err => console.log(err)
                })
            }
        } catch (error) {
            console.error(error); 
        }
    }

    ngOnDestroy() {
        this.ProductService.resetProduct()
    }
 
}
