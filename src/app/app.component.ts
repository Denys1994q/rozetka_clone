import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, Event } from '@angular/router';
import {filter} from 'rxjs/operators';
import { AuthService } from './core/services/auth.service';
import { DeviceService } from './core/services/device.service';
import { Subject, takeUntil } from 'rxjs';
import { WishlistBtnService } from './btns/wishlist-btn/wishlist-btn.service';
import { IProduct } from './product/models/product.model';
import { WishlistApiService } from './cabinet/services/wishlist-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})

export class AppComponent implements OnInit {
    showFooter: boolean = true
    showHeader: boolean = true
    unsubscribe$ = new Subject<void>()

    constructor(
        private router: Router, 
        private deviceService: DeviceService,
        private wishlistBtnService: WishlistBtnService,
        private wishlistApiService: WishlistApiService,
        private authService: AuthService ) {
            router.events.pipe(
                takeUntil(this.unsubscribe$),
                filter(event => event instanceof NavigationEnd))
                .subscribe({
                    next: (event: Event ) => {
                        if(event instanceof NavigationEnd ){
                            if (event.url === '/checkout') {
                                this.showFooter = false;
                                this.showHeader = false;
                            } else if (event.url === '/') {
                                this.showFooter = false;
                                this.showHeader = true;
                            } else {
                                this.showFooter = true;
                            }
                        }
                    }
                });
    }

    ngOnInit(): void {
        this.authService.getUser().pipe(takeUntil(this.unsubscribe$)).subscribe({
            next: () => {},
            error: error => console.log('user auth failed', error.error.message)
        })
        if (typeof window !== 'undefined' && localStorage) {
            localStorage.setItem('side-banner', 'active')
        }
        this.deviceService.detectDevice()
        this.authService.userData$.pipe(takeUntil(this.unsubscribe$)).subscribe({
            next: user =>  this.wishlistApiService.getWishlist().pipe(takeUntil(this.unsubscribe$)).subscribe({
                next: products => {
                    if (products.value) {
                        const prodIds = products.value.map((item: IProduct) => item._id)
                        this.wishlistBtnService.setProductsIds(prodIds)
                    } else {
                        this.wishlistBtnService.setProductsIds([])
                    }
                }
            })
        })
    }

    ngOnDestroy() {
        this.unsubscribe$.next()
        this.unsubscribe$.complete()
    }

}

