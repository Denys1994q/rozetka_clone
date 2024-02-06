import { Component, Input, Output, EventEmitter  } from '@angular/core';
import { IProduct } from 'src/app/product/models/product.model';
import { CartService } from 'src/app/cart/services/cart.service';
import { WishlistService } from 'src/app/cabinet/services/wishlist.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { SnackBarComponent } from 'src/app/shared/components/snackBar/snack-bar.component';

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
    @Input() full: boolean = false 
    @Input() data!: Cards
    @Input() withWishlistOption!: boolean 
    @Input() size: string = 'small'
    @Input() withCheckbox!: boolean 
    @Input() withDeleteOption!: boolean 
    @Input() allCardsChecked!: boolean 
    @Output() cardsChange = new EventEmitter<any>();
    @Output() cardsCheckboxChange = new EventEmitter<any>();
    @Output() cardDeleteBtnClick = new EventEmitter<any>();
    showBtn: boolean = true
    endVal: number = 5

    constructor(
        public cartService: CartService,
        private _snackBar: MatSnackBar,
        public wishlistService: WishlistService) { }

    ngOnInit() { 
        if (typeof window !== 'undefined') {
            if (window.innerWidth < 700) {
                this.endVal = 2
            }
        }
    }

    getPriceObject(prod: any) {
        return prod.searchStatus.find((status: any) => status.searchPosition === 'price').option
    }

    showMoreCards(type: string) {
        this.endVal = this.endVal + this.data.products.length
        this.cardsChange.emit(type)
        this.showBtn = false
    }

    onCheckboxChange(prodId: string) {
        this.cardsCheckboxChange.emit(prodId)
    }

    onCardDeleteBtnClick(prodId: string) {
        this.cardDeleteBtnClick.emit(prodId)
    }
    
    openSnackbar() {
        this._snackBar.openFromComponent(SnackBarComponent, {
            duration: 3000,
            panelClass: ['blue-snackbar']
        });
    }

}
