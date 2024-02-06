import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BtnsGridPanelComponent } from './btns-grid-panel/btns-grid-panel.component';
import { LoadMoreBtnComponent } from './load-more-btn/load-more-btn.component';
import { SearchResultBtnComponent } from './search-result-btn/search-result-btn.component';
import { MatIconModule } from '@angular/material/icon';
import { WishlistBtnComponent } from './wishlist-btn/wishlist-btn.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CartBtnComponent } from './cart-btn/cart-btn.component';
import { BuyBtnComponent } from './buy-btn/buy-btn.component';
import { MatBadgeModule } from '@angular/material/badge';

@NgModule({
  declarations: [
    BtnsGridPanelComponent,
    LoadMoreBtnComponent,
    SearchResultBtnComponent,
    WishlistBtnComponent,
    CartBtnComponent,
    BuyBtnComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatBadgeModule
  ],
  exports: [
    BtnsGridPanelComponent,
    LoadMoreBtnComponent,
    SearchResultBtnComponent,
    WishlistBtnComponent,
    CartBtnComponent,
    BuyBtnComponent
  ]
})
export class BtnsModule { }
