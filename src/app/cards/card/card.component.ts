import { Component, Input, Output, EventEmitter} from "@angular/core";
import { IProduct } from "src/app/product/models/product.model";
import { WishlistService } from "src/app/cabinet/services/wishlist.service";

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.sass']
})
export class CardComponent {
    @Input() product!: IProduct
    @Input() isDoubleSided!: boolean
    @Input() size!: string
    @Input() withDeleteOption!: boolean 
    @Input() withWishlistOption!: boolean 
    @Input() withCheckbox!: boolean 
    @Input() allCardsChecked!: boolean 
    @Output() cardCheckboxChange = new EventEmitter<any>();
    @Output() cardDeleteBtnClick = new EventEmitter<any>();
    isBackCardVisible!: boolean

    constructor(
        public wishlistService: WishlistService) { }

    handleMouseEnterCard() {
        this.isBackCardVisible = true
    }

    handleMouseLeaveCard() {
        this.isBackCardVisible = false
    }

    getPriceObject(prod: any) {
        return prod.searchStatus.find((status: any) => status.searchPosition === 'price').option
    }

    onCheckboxChange(prodId: string) {
        this.cardCheckboxChange.emit(prodId)
    }

    onCardDeleteBtnClick(prodId: string) {
        this.cardDeleteBtnClick.emit(prodId)
    }

}