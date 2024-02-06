import { Injectable } from "@angular/core";
import { AuthService } from "src/app/core/services/auth.service";
import { ModalService } from "src/app/modals/modal.service";
import { takeUntil, Subject, BehaviorSubject } from "rxjs";
import { WishlistApiService } from "src/app/cabinet/services/wishlist-api.service";

@Injectable({
    providedIn: 'root'
})

export class WishlistBtnService {
    wishlistProdsIds$ = new BehaviorSubject<string[]>([])
    unsubscribe$ = new Subject<void>()

    constructor(
        public authService: AuthService,
        private wishlistApiService: WishlistApiService,
        public modalService: ModalService) {}

    setProductsIds(productsIds: string[]) {
        this.wishlistProdsIds$.next(productsIds)
    }

    addToWishlist(productId: string) {
        if (!this.authService.isAuthenticated()) {
            this.modalService.openDialog('login');
        }
        try {
            const isInWishlist = this.wishlistProdsIds$.getValue().indexOf(productId) > -1
            if (!isInWishlist) {
                this.wishlistApiService.addToWishlist(productId).pipe(takeUntil(this.unsubscribe$)).subscribe({
                    next: () => {
                        const data = this.wishlistProdsIds$.getValue()
                        this.wishlistProdsIds$.next([...data, productId])
                    },
                    error: err => console.log(err)
                })
            } else {
                this.wishlistApiService.removeFromWishlist([productId]).pipe(takeUntil(this.unsubscribe$)).subscribe({
                    next: () => {
                        const data = this.wishlistProdsIds$.getValue()
                        const filteredData = data.filter(prodId => prodId !== productId)
                        this.wishlistProdsIds$.next(filteredData)
                    },
                    error: err => console.log(err)
                })
            }
        } catch (error) {
            console.error(error); 
        }
    }
    
}