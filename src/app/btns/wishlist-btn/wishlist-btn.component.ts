import { Component, Input } from '@angular/core';
import { WishlistBtnService } from './wishlist-btn.service';
import { takeUntil, Subject } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-wishlist-btn',
  templateUrl: './wishlist-btn.component.html',
  styleUrls: ['./wishlist-btn.component.sass'],
})
export class WishlistBtnComponent {
    @Input() productId!: string
    isInWishlist!: boolean
    unsubscribe$ = new Subject<void>()

    constructor(public wishlistBtnService: WishlistBtnService, private authService: AuthService) { }

    ngOnInit() {
        this.authService.userData$.pipe(takeUntil(this.unsubscribe$)).subscribe(user => {
            if (user) {
                this.wishlistBtnService.wishlistProdsIds$.pipe(takeUntil(this.unsubscribe$)).subscribe({
                    next: prods => this.isInWishlist = prods.includes(this.productId)
                })
            }
        })
    }

    handleBtnClick() {
        this.wishlistBtnService.addToWishlist(this.productId)
    }

    ngOnDestroy() {
        this.unsubscribe$.next()
        this.unsubscribe$.complete()
    }
}