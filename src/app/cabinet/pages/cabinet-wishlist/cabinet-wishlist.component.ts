import { Component } from '@angular/core';
import { ProductService } from 'src/app/product/services/product.service';
import { WishlistService } from '../../services/wishlist.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { IProduct } from 'src/app/product/models/product.model';
import { CartService } from 'src/app/cart/services/cart.service';

@Component({
  selector: 'app-cabinet-wishlist',
  templateUrl: './cabinet-wishlist.component.html',
  styleUrls: ['./cabinet-wishlist.component.sass']
})
export class CabinetWishlistPage {

    constructor(
        public productService: ProductService, 
        public authService: AuthService, 
        public wishlistService: WishlistService,
        private cartService: CartService) {}

    // список продуктів, виділених юзером 
    checkedProds: string[] = []
    // виділити всі продукти 
    allCardsChecked!: boolean
    // завантаження списку продуктів
    loading: boolean = false
    // 
    wishlistItems: IProduct[] = []

    ngOnInit() {
        this.loading = true
        this.authService.getUser().subscribe({
            next: user => {
                if (user && user.wishlist) {
                    this.loading = false
                    this.wishlistService.setWishlistItems(user.wishlist)
                } 
            },
            error: err => this.loading = false
        })
        this.wishlistService.wishlistItems$.subscribe((items) => {
            this.wishlistItems = items;
          });
    }

    onSelectChange(e: string) {
        this.wishlistService.sortWishlist(e)
    }

    onCardCheckboxChange(prodId: string) {
        if (this.checkedProds.includes(prodId)) {
            this.checkedProds = this.checkedProds.filter(productId => productId !== prodId)
        } else {
            this.checkedProds.push(prodId)
        }
    }

    chooseAll() {
        this.allCardsChecked = true
        this.wishlistService.wishlistItems$.subscribe({
            next: wishlist => {
                wishlist.map(item => this.checkedProds.push(item._id))
            }, 
            error: err => console.log(err)
        })
    }

    resetAll() {
        this.allCardsChecked = false
        this.checkedProds = []
    }

    deleteFromWishlist() {
        this.wishlistService.removeFromWishlist(this.checkedProds).subscribe({
            next: response => {
                this.wishlistService.setWishlistItems(response.updatedWishlist);    
                this.checkedProds = [];
            },
            error: err => console.log(err)
        });
    }

    buyProds() {
        this.wishlistItems.map(item => {
            this.cartService.addToShoppingCart({...item, amount: 1})
        })
    }

}