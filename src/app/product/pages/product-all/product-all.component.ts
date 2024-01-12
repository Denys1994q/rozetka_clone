import { Component, ViewChild, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import { Slide } from 'src/app/carousel/carousel.component';
import { ProductService } from '../../services/product.service';
import { CartService } from 'src/app/cart/services/cart.service';
import { ModalService } from 'src/app/modals/modal.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { WishlistService } from 'src/app/cabinet/services/wishlist.service';
import { isPlatformBrowser } from '@angular/common';
import { ScrollService } from 'src/app/core/services/scroll.service';
import { IProduct } from '../../models/product.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'

@Component({
  selector: 'app-product-all',
  templateUrl: './product-all.component.html',
  styleUrls: ['./product-all.component.sass']
})
export class ProductAllComponent {
    showFullText: boolean = false
    hideBtn: boolean = false
    slides: Slide[] = []
    product: IProduct | null = null
    @ViewChild('videoBlock') videoBlock!: ElementRef;
    @ViewChild('characteristicsAndReviewsBlock') characteristicsAndReviewsBlock!: ElementRef;

    constructor(
        @Inject(PLATFORM_ID) private platformId: Object,
        public authService: AuthService,
        private wishlistService: WishlistService,
        public ProductService: ProductService, 
        public cartService: CartService, 
        private scrollService: ScrollService,
        public modalService: ModalService) {
            this.ProductService.product$.pipe(takeUntilDestroyed()).subscribe(prod => {
                this.product = prod
            })
        }

    ngOnInit() {
        this.scrollService.scrollToTop()
        this.ProductService.setBaseView(true)
    }

    showFullBlock() {
        this.showFullText = true
        this.hideBtn = true
    }

    scrollToBlock(block: string) {
        if (isPlatformBrowser(this.platformId)) {
            if (block === 'videoBlock') {
                this.videoBlock.nativeElement.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
            } else if (block === 'characteristicsAndReviewsBlock') {
                this.characteristicsAndReviewsBlock.nativeElement.scrollIntoView({
                    behavior: "smooth",
                });
            }
        }
    }

    addToCart() {
        this.cartService.addToShoppingCart({...this.product, amount: 1})  
    }

    checkIfProductInCart(id: string) {
        if (isPlatformBrowser(this.platformId)) {
            const cartData: any = localStorage.getItem('shoppingCart');
            const productsFromStorage = JSON.parse(cartData) 
            if (productsFromStorage && productsFromStorage.find((product: any) => product._id === id)) {
                return true
            } else {
                return false
            }
        } else {
            return false
        }
    }
  
    onAddToWishlist(productId: string) {
        if (!this.authService.isAuthenticated()) {
            this.modalService.openDialog('login');
        }
        try {
            if (this.product?.isInWishlist) {
                this.wishlistService.removeFromWishlist([productId]).subscribe({
                    next: () => this.ProductService.updateProductWishlistStatus(false),
                    error: err => console.log(err)
                })
            } else {
                this.wishlistService.addToWishlist(productId).subscribe({
                    next: () => this.ProductService.updateProductWishlistStatus(true),
                    error: err => console.log(err)
                })
            }
        } catch (error) {
            console.error(error); 
        }
    }

}
