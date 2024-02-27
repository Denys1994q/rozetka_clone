import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CartService } from 'src/app/cart/services/cart.service';
import { IProduct } from '../../models/product.model';
import { ModalService } from 'src/app/modals/modal.service';
import { ActivatedRoute } from '@angular/router';
import { DeviceService } from 'src/app/core/services/device.service';
import { ScrollService } from 'src/app/core/services/scroll.service';
import { Subject, takeUntil, filter } from 'rxjs';
import { Router } from '@angular/router';
import { NavigationEnd } from '@angular/router';
import { RecentlyViewedApiService } from 'src/app/cabinet/services/recently-viewed-api.service';
import { ActivatedRouteSnapshot } from '@angular/router';
import { ProductApiService } from '../../services/product-api.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.sass']
})
export class ProductComponent {
    product$ = this.productService.product$
    productTabs$ = this.productService.productTabs$
    error$ = this.productApiService.getOneProductError$
    errorMsg$ = this.productApiService.getOneProductErrorMsg$
    unsubscribe$ = new Subject<void>()
    mainPage: boolean = true

    constructor(
        public deviceService: DeviceService,
        public route:ActivatedRoute, 
        private router: Router,
        public productService: ProductService, 
        private productApiService: ProductApiService,
        public cartService: CartService,
        public modalService: ModalService,
        private recentlyViewedApiService: RecentlyViewedApiService,
        private scrollService: ScrollService) {}

    ngOnInit() {
        const snapshot: ActivatedRouteSnapshot = this.route.snapshot;
        if ( snapshot.firstChild && snapshot.firstChild?.url.length > 0 ) {
            this.mainPage = false
            const path = snapshot.firstChild?.url[0].path
            this.productService.checkActiveTab(path)
        } else {
            this.productService.checkActiveTab('')
        }
        this.route.params.pipe(takeUntil(this.unsubscribe$)).subscribe(params => {
            const productId = params['productId'];
            this.productService.getProduct(productId)
            this.recentlyViewedApiService.addToRecentlyViewedProds(productId).pipe(takeUntil(this.unsubscribe$)).subscribe({
                next: () => {},
                error: err => console.log(err)
            })
        })
        this.router.events.pipe(takeUntil(this.unsubscribe$)).pipe(
            filter(event => event instanceof NavigationEnd)
          ).subscribe(() => {
            if (this.route.snapshot.children[0].url[0]) {
                const path = this.route.snapshot.children[0].url[0].path
                this.productService.checkActiveTab(path)
            } else {
                this.productService.checkActiveTab('')
            }
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
        this.unsubscribe$.next()
        this.unsubscribe$.complete()
    }

}
