import { Component, Input, Output, EventEmitter, SimpleChanges  } from '@angular/core';
import { IProduct } from 'src/app/product/models/product.model';
import { CartService } from 'src/app/cart/services/cart.service';
import { WishlistService } from 'src/app/cabinet/services/wishlist.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { SnackBarComponent } from 'src/app/shared/components/snackBar/snack-bar.component';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { ModalService } from 'src/app/modals/modal.service';

interface Cards {
  category?: string,
  products: IProduct[] 
}

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.sass']
})
export class CardsComponent {
    
    constructor(
        public cartService: CartService,
        private authService: AuthService,
        private modalService: ModalService,
        private _snackBar: MatSnackBar,
        public wishlistService: WishlistService) {}

    @Input() full: boolean = false 
    @Input() data!: Cards
    @Input() size: string = 'small'
    @Input() withCheckbox!: boolean 
    @Input() withDeleteOption!: boolean 
    @Input() allCardsChecked!: boolean 
    @Output() cardsChange = new EventEmitter<any>();
    @Output() cardCheckboxChange = new EventEmitter<any>();
    @Output() cardDeleteBtnClick = new EventEmitter<any>();
    showBtn: boolean = true
    raiting!: any
    endVal: number = 5
    activeIndex!: number | boolean
    prodIdsInTheCart: string[] = [] 
    prodIdsInWishlist: string[] = [] 
    modData!: any
    unsubscribe$ = new Subject()

    ngOnInit() { 
        this.authService.getUser().pipe(takeUntil(this.unsubscribe$)).subscribe({
            next: userData => {
                if (!userData) {
                    this.prodIdsInWishlist = []
                } else {
                    if (userData && userData.wishlist) {
                        userData.wishlist.map((item: any) => this.prodIdsInWishlist.push(item._id))
                    } 
                }
            },
            error: err => console.log(err)  
        })

        this.getData(this.data.products)
        if (typeof window !== 'undefined') {
            if (window.innerWidth < 700) {
                this.endVal = 2
            }
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['data'] && changes['data'].currentValue) {
            this.getData(changes['data'].currentValue.products)
        }
    }

    getData(data: any) {
        this.modData = data.map((item: any) => {
            const sumRaiting = this.getRaiting(item);
            const isAvailable = item.searchStatus.find((searchStatus: any) => searchStatus.searchPosition === 'sell_status').option === 'Є в наявності';
            return {
                ...item,
                sumRaiting: sumRaiting,
                isAvailable: isAvailable
            };
        });
    }

    getPriceObject(prod: any) {
        return prod.searchStatus.find((status: any) => status.searchPosition === 'price').option
    }

    getRaiting(prod: any) {
        let sum = 0
        let res;
        if (prod.reviews_data && prod.reviews_data.length > 0) {
            prod.reviews_data.map((review: any) => {
                sum += review.rating || review.raiting
                res = sum / prod.reviews_data.length
            })
        }
        return res
    }

    checkIfAvailable(prod: any) {

    }

    setshowExtendedCard(i: number) {
        this.activeIndex = i
    }

    hideExtendedCard() {
        this.activeIndex = false
    }

    showMoreCards(type: string) {
        this.endVal = this.endVal + this.data.products.length
        this.cardsChange.emit(type)
        this.showBtn = false
    }

    onCheckboxChange(prodId: string) {
        this.cardCheckboxChange.emit(prodId)
    }

    onCardDeleteBtnClick(prodId: string) {
        this.cardDeleteBtnClick.emit(prodId)
    }

    addToCart(prod: any) {
        this.cartService.addToShoppingCart({...prod, amount: 1})  
    }

    checkIfProductInCart(id: string) {
        if (typeof window !== 'undefined' && localStorage) {
            const cartData: any = localStorage.getItem('shoppingCart');
            const productsFromStorage = JSON.parse(cartData) 
            if (productsFromStorage && productsFromStorage.find((product: any) => product._id === id)) {
                return true
            } else {
                return false
            }
        } else {
            return false
        }
    }

    onAddToWishlist(productId: string) {
        if (!this.authService.isAuthenticated()) {
            this.modalService.openDialog('login');
        }
        try {
            if (this.prodIdsInWishlist.includes(productId)) {
                this.wishlistService.removeFromWishlist([productId]).pipe(takeUntil(this.unsubscribe$)).subscribe({
                    next: () => {
                        this.prodIdsInWishlist = this.prodIdsInWishlist.filter(item => item !== productId)
                    },
                    error: err => console.log(err)
                })
            } else {
                this.wishlistService.addToWishlist(productId).pipe(takeUntil(this.unsubscribe$)).subscribe({
                    next: () => {
                        this.prodIdsInWishlist.push(productId)
                    },
                    error: err => console.log(err)
                })
            }
        } catch (error) {
            console.error(error); 
        }
    }

    openSnackbar() {
        this._snackBar.openFromComponent(SnackBarComponent, {
            duration: 3000,
            panelClass: ['blue-snackbar']
        });
    }

    checkIfProductInWishlist(id: string) {
        return this.prodIdsInWishlist.includes(id) ? true : false
    }

}
