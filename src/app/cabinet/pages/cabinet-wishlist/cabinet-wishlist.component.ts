import { Component } from '@angular/core';
import { ProductService } from 'src/app/product/services/product.service';
import { WishlistService } from '../../services/wishlist.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { IProduct } from 'src/app/product/models/product.model';
import { CartService } from 'src/app/cart/services/cart.service';
import { Subject, takeUntil  } from 'rxjs';

@Component({
  selector: 'app-cabinet-wishlist',
  templateUrl: './cabinet-wishlist.component.html',
  styleUrls: ['./cabinet-wishlist.component.sass']
})
export class CabinetWishlistPage {
    checkedProds: string[] = []
    allCardsChecked!: boolean
    loading: boolean = false
    wishlistItems: IProduct[] = []
    unsubscribe$ = new Subject()

    constructor(
        public productService: ProductService, 
        public authService: AuthService, 
        public wishlistService: WishlistService,
        private cartService: CartService) {}

    ngOnInit() {
        this.loading = true
        this.authService.getUser().pipe(takeUntil(this.unsubscribe$)).subscribe({
            next: user => {
                this.loading = false
                this.wishlistItems = user.wishlist
            },
            error: err => this.loading = false
        })
    }

    onSelectChange(e: string) {
        this.wishlistService.sortWishlist(e).pipe(takeUntil(this.unsubscribe$)).subscribe({
            next: response => this.wishlistService.setWishlistItems(response.sortedWishlist)
        })
    }

    onCardCheckboxChange(prodId: string) {
        if (this.checkedProds.includes(prodId)) {
            this.checkedProds = this.checkedProds.filter(productId => productId !== prodId)
        } else {
            this.checkedProds.push(prodId)
        }
    }

    handleSelectAllClick() {
        this.allCardsChecked = true
        this.wishlistItems.map((item) => {
            this.checkedProds.push(item._id)
        })
    }

    handleResetAllClick() {
        this.allCardsChecked = false
        this.checkedProds = []
    }

    handleDeleteFromWishlistClick() {
        this.wishlistService.removeFromWishlist(this.checkedProds).pipe(takeUntil(this.unsubscribe$)).subscribe({
            next: () => {
                this.wishlistService.sortWishlist(this.wishlistService.activeSortOption)
                    .pipe(takeUntil(this.unsubscribe$))
                    .subscribe({
                        next: res => {
                            this.wishlistItems = res.sortedWishlist  
                            this.checkedProds = [];
                        } 
                })
            },
            error: err => console.log(err)
        });
    }

    handleBuyProdsClick() {
        this.wishlistItems.map(item => {
            this.cartService.addToShoppingCart({...item, amount: 1})
        })
    }

}