import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { SearchResultsService } from 'src/app/categories/services/search-results.service';
import { CartService } from 'src/app/cart/services/cart.service';
import { IProduct } from '../../models/product.model';
import { ModalService } from 'src/app/modals/modal.service';
import { RecentlyViewedService } from 'src/app/cabinet/services/recently-viewed.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { WishlistService } from 'src/app/cabinet/services/wishlist.service';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductTabsService } from '../../services/product-tabs.service';
import { CategoriesApiService } from 'src/app/categories/services/categories-api.service';
import { DeviceService } from 'src/app/core/services/device.service';
import { ScrollService } from 'src/app/core/services/scroll.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.sass']
})
export class ProductComponent {
    product!: IProduct
    isInWishlist: boolean = false
    prodIdsInWishlist: string[] = [] 

    constructor(
        @Inject(PLATFORM_ID) private platformId: Object,
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
        private categoriesApiService: CategoriesApiService,
        private scrollService: ScrollService,
        public productTabsService: ProductTabsService
    ) {}

    ngOnInit() {
        this.scrollService.scrollToTop()

        this.route.params.subscribe(params => {
            const productId = params['productId'];
            // отримуємо з сервісу інфо щодо товару по його айді
            this.ProductService.getCurrentProduct(productId)
            this.findCategory(productId)

            this.recentlyViewedService.addToRecentlyViewedProds(productId).subscribe({
                next: response => console.log(response),
                error: err => console.log(err)
            })

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
        })
       
    }

    addToCart() {
        this.cartService.addToShoppingCart({...this.ProductService.product, amount: 1})  
    }

    findCategory(urlId: string) {
        this.categoriesApiService.getAllCategories().subscribe({
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
