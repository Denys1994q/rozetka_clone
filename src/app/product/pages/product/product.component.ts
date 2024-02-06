import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CartService } from 'src/app/cart/services/cart.service';
import { IProduct } from '../../models/product.model';
import { ModalService } from 'src/app/modals/modal.service';
import { ActivatedRoute } from '@angular/router';
import { DeviceService } from 'src/app/core/services/device.service';
import { ScrollService } from 'src/app/core/services/scroll.service';
import { Observable, Subject, takeUntil, filter } from 'rxjs';
import { Router } from '@angular/router';
import { NavigationEnd } from '@angular/router';
import { RecentlyViewedApiService } from 'src/app/cabinet/services/recently-viewed-api.service';
import { ActivatedRouteSnapshot } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.sass']
})
export class ProductComponent {
    product$!: Observable<IProduct | null>
    loading$!: Observable<boolean>
    error$!: Observable<boolean>
    isInWishlist!: boolean
    unsubscribe$ = new Subject<void>()
    mainPage: boolean = true

    constructor(
        public deviceService: DeviceService,
        public route:ActivatedRoute, 
        private router: Router,
        public productService: ProductService, 
        public cartService: CartService,
        public modalService: ModalService,
        private recentlyViewedApiService: RecentlyViewedApiService,
        private scrollService: ScrollService) {
            this.product$ = this.productService.product$
            this.loading$ = this.productService.getOneProductLoading$
            this.error$ = this.productService.getOneProductError$
        }

    ngOnInit() {
        const snapshot: ActivatedRouteSnapshot = this.route.snapshot;
        snapshot.firstChild && snapshot.firstChild?.url.length > 0 ? this.mainPage = false : null
        this.route.params.subscribe(params => {
            const productId = params['productId'];
            this.productService.getCurrentProduct(productId)
            this.recentlyViewedApiService.addToRecentlyViewedProds(productId).pipe(takeUntil(this.unsubscribe$)).subscribe({
                next: () => {},
                error: err => console.log(err)
            })
        })
        this.router.events.pipe(
            filter(event => event instanceof NavigationEnd)
          ).subscribe(() => {
            this.mainPage = !this.route.snapshot.children[0].url.length
        });
    }

    ngAfterViewInit() {
        this.scrollService.scrollToTop()
    }

    addToCart(product: IProduct) {
        this.cartService.addToShoppingCart({...product, amount: 1})  
    }

    ngOnDestroy() {
        this.productService.resetProduct()
        this.unsubscribe$.next()
        this.unsubscribe$.complete()
    }

 
}
