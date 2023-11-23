import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { SearchResultsService } from 'src/app/search/services/search-results.service';
import { ApiService } from 'src/app/core/services/api.service';
import { CartService } from 'src/app/cart/services/cart.service';
import { ProductInterface } from 'src/app/core/services/api-response-types';
import { ModalService } from 'src/app/shared/components/modal/modal.service';
import { RecentlyViewedService } from 'src/app/cabinet/services/recently-viewed.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { WishlistService } from 'src/app/cabinet/services/wishlist.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.sass']
})
export class ProductComponent {
    baseView!: boolean
    product!: ProductInterface
    video!: any[]
    routes!: any
    urlId!: any
    isInWishlist: boolean = false
    prodIdsInWishlist: string[] = [] 
    mobile: boolean = false

    constructor(
        private router: Router, 
        public route:ActivatedRoute, 
        public ProductService: ProductService, 
        private authService: AuthService,
        private wishlistService: WishlistService,
        public SearchResultsService: SearchResultsService,
        public apiService: ApiService,
        public cartService: CartService,
        public modalService: ModalService,
        private recentlyViewedService: RecentlyViewedService
    ) {}

    ngOnInit() {
        this.scrollToTop()
        this.route.url.subscribe(route => {
            // айді товару
            const lastLetterBeforeId = this.router.url.lastIndexOf('/')
            this.urlId = this.router.url.slice(lastLetterBeforeId+1, lastLetterBeforeId+this.router.url.length-1)
            // отримуємо з сервісу інфо щодо товару по його айді
            this.ProductService.getCurrentProduct(route[1].path, this.urlId)
            this.findCategory(route[1].path)
            // на основі юрл сторінки визначаємо вигляд компоненту
            if (route[1].path === this.urlId && (route[1].path.toString().length + route[0].path.length == this.router.url.length-2)) {
                this.baseView = true
                this.recentlyViewedService.addToRecentlyViewedProds(this.urlId).subscribe({
                    next: response => console.log(response),
                    error: err => console.log(err)
                })
            } else {
                this.baseView = false
                this.authService.getUser().subscribe({
                    next: user => {
                        if (user && user.wishlist) {
                            this.isInWishlist = false
                            this.wishlistService.setWishlistItems(user.wishlist)
                            this.prodIdsInWishlist = user.wishlist.map((item: any) => item._id)
                            if (this.prodIdsInWishlist.includes(this.ProductService.product._id)) {
                                this.isInWishlist = true
                            }
                        } 
                    },
                    error: err => console.log(err)
                })
            }
        })
        if (window.innerWidth < 700) {
            this.mobile = true
        }
    }

    addToCart() {
        this.cartService.addToShoppingCart({...this.ProductService.product, amount: 1})  
    }

    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    findCategory(urlId: string) {
        this.apiService.getAllCategories().subscribe({
            next: response => {
                response.find((category: any) => {
                    category.subCategories.find((sub: any) => {
                    sub.products.find((prod: any) => {
                        if (prod._id === urlId) {
                            this.cartService.getCart()
                            this.ProductService.setCategory(category)
                            this.ProductService.setSubcategory(sub)
                        }
                    })
                    })
                })
            },
            error: err => console.log(err)
        })
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

    ngOnDestroy() {
        this.ProductService.product = null
    }
 
}
