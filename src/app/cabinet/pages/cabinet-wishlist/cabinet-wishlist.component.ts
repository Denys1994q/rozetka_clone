import { Component } from '@angular/core';
import { IProduct } from 'src/app/product/models/product.model';
import { Subject, takeUntil, scan} from 'rxjs';
import { CartService } from 'src/app/cart/services/cart.service';
import { WishlistService } from '../../services/wishlist.service';
import { WishlistBtnService } from 'src/app/btns/wishlist-btn/wishlist-btn.service';
import { WishlistApiService } from '../../services/wishlist-api.service';

@Component({
  selector: 'app-cabinet-wishlist',
  templateUrl: './cabinet-wishlist.component.html',
  styleUrls: ['./cabinet-wishlist.component.sass']
})
export class CabinetWishlistPage {
    unsubscribe$ = new Subject<void>()
    wishlistItems$ = this.wishlistService.products$
    activeSortOption$ = this.wishlistService.activeSortOption$
    checkboxClickedId$: Subject<string> = new Subject<string>
    checkedProducts$ = this.checkboxClickedId$.pipe(
        takeUntil(this.unsubscribe$),
        scan<any, any>((checkedProducts: any, prodId: any) => {
            if (prodId) {
                const newSet = new Set(checkedProducts);
                if (newSet.has(prodId)) {
                    newSet.delete(prodId);
                } else {
                    newSet.add(prodId);
                }
                return Array.from(newSet);
            } else {
                return Array.from([]);
            }
        }, []),
    )

    constructor(
        private cartService: CartService,
        public wishlistApiService: WishlistApiService,
        private wishlistBtnService: WishlistBtnService,
        public wishlistService: WishlistService) {
            this.checkboxClickedId$.pipe(takeUntil(this.unsubscribe$)).subscribe()
        }

    ngOnInit() {
        this.wishlistService.deleteProducts$.pipe(takeUntil(this.unsubscribe$)).subscribe({
            next: resp => {
                const prodIds = resp.updatedWishlist.map((item: IProduct) => item._id)
                this.wishlistBtnService.setProductsIds(prodIds)
            } 
        })
    }

    onSelectChange(e: string) {
        this.wishlistService.setActiveSortOption(e)
    }

    onCardsCheckboxChange(prodId: string) {
        this.checkboxClickedId$.next(prodId)
    }

    handleSelectAllClick(wishlistItems: IProduct[]) {
        wishlistItems.map((item: IProduct) => this.checkboxClickedId$.next(item._id))
    }

    handleResetAllClick() {
        this.checkboxClickedId$.next('')
    }

    handleDeleteFromWishlistClick(checkedProducts: string[]) {
        this.wishlistService.deleteFromWishlist(checkedProducts);
        this.checkboxClickedId$.next('')
    }

    handleBuyProdsClick(wishlistItems: IProduct[]) {
        wishlistItems.map(prod => this.cartService.addToShoppingCart({...prod, amount: 1}))
    }

    ngOnDestroy() {
        this.unsubscribe$.next()
        this.unsubscribe$.complete()
    }

}

