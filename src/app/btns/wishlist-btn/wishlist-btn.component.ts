import { Component, Input } from '@angular/core';
import { WishlistBtnService } from './wishlist-btn.service';
import { takeUntil, Subject } from 'rxjs';

@Component({
  selector: 'app-wishlist-btn',
  templateUrl: './wishlist-btn.component.html',
  styleUrls: ['./wishlist-btn.component.sass'],
})
export class WishlistBtnComponent {
    @Input() productId!: string
    isInWishlist!: boolean
    unsubscribe$ = new Subject<void>()

    constructor(public wishlistBtnService: WishlistBtnService) { }

    ngOnInit() {
        this.wishlistBtnService.wishlistProdsIds$.pipe(takeUntil(this.unsubscribe$)).subscribe({
            next: prods => this.isInWishlist = prods.includes(this.productId)
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