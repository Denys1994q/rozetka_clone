import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BtnsGridPanelComponent } from './btns-grid-panel/btns-grid-panel.component';
import { LoadMoreBtnComponent } from './load-more-btn/load-more-btn.component';
import { SearchResultBtnComponent } from './search-result-btn/search-result-btn.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    BtnsGridPanelComponent,
    LoadMoreBtnComponent,
    SearchResultBtnComponent
  ],
  imports: [
    CommonModule,
    MatIconModule
  ],
  exports: [
    BtnsGridPanelComponent,
    LoadMoreBtnComponent,
    SearchResultBtnComponent
  ]
})
export class BtnsModule { }
