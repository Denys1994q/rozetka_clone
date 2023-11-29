import { Component, ViewChild, ElementRef } from '@angular/core';
import { Slide } from 'src/app/shared/components/carousel/carousel.component';
import { Comment } from 'src/app/shared/components/comment/comment.component';
import { ProductService } from '../../services/product.service';
import { CartService } from 'src/app/cart/services/cart.service';
import { ModalService } from 'src/app/shared/components/modal/modal.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { WishlistService } from 'src/app/cabinet/services/wishlist.service';
import { ProductTabsService } from '../../services/product-tabs.service';

@Component({
  selector: 'app-product-all',
  templateUrl: './product-all.component.html',
  styleUrls: ['./product-all.component.sass']
})
export class ProductAllComponent {
    showFullText: boolean = false
    hideBtn: boolean = false
    slides: Slide[] = []
    prodIdsInWishlist: string[] = [] 
    isInWishlist!: boolean

    showFullBlock() {
        this.showFullText = true
        this.hideBtn = true
    }

    @ViewChild('videoBlock') videoBlock!: ElementRef;
    @ViewChild('characteristicsAndReviewsBlock') characteristicsAndReviewsBlock!: ElementRef;

    constructor(
        public authService: AuthService,
        private wishlistService: WishlistService,
        public ProductService: ProductService, 
        public cartService: CartService, 
        public productTabsService: ProductTabsService,
        public modalService: ModalService) {}

    ngOnInit() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
        this.productTabsService.setBaseView(true)
        this.authService.getUser().subscribe({
            next: user => {
                if (user && user.wishlist) {
                    this.wishlistService.setWishlistItems(user.wishlist)
                    user.wishlist.map((item: any) => this.prodIdsInWishlist.push(item._id))
                if (this.prodIdsInWishlist.includes(this.ProductService.product._id)) {
                    this.isInWishlist = true
                }
                } 
            },
            error: err => console.log(err)
        })
    }

    scrollToBlock(block: string) {
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

    addToCart() {
        this.cartService.addToShoppingCart({...this.ProductService.product, amount: 1})  
    }

    checkIfProductInCart(id: string) {
        const cartData: any = localStorage.getItem('shoppingCart');
        const productsFromStorage = JSON.parse(cartData) 
        if (productsFromStorage && productsFromStorage.find((product: any) => product._id === id)) {
            return true
        } else {
            return false
        }
    }
  
    onAddToWishlist(productId: string) {
        if (!this.authService.isAuthenticated()) {
            this.modalService.openDialog('login');
        }
        try {
            if (this.prodIdsInWishlist.includes(productId)) {
                this.wishlistService.removeFromWishlist([productId]).subscribe({
                    next: resp => {
                        this.isInWishlist = false
                        this.prodIdsInWishlist = this.prodIdsInWishlist.filter(item => item !== productId)
                    },
                    error: err => console.log(err)
                })
            } else {
                this.wishlistService.addToWishlist(productId).subscribe({
                    next: resp => {
                        this.isInWishlist = true
                        this.prodIdsInWishlist.push(productId)
                        this.wishlistService.setWishlistItems(resp.updatedWishlist)
                    },
                    error: err => console.log(err)
                })
            }
        } catch (error) {
            console.error(error); 
        }
    }

}
