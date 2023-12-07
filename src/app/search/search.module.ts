import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductModule } from '../product/product.module';
import { AlphabetBlockComponent } from './components/alphabet-block/alphabet-block.component';
import { SearchPanelComponent } from './components/search-panel/search-panel.component';
import { InputsModule } from '../inputs/inputs.module';
import { PriceModule } from '../price/price.module';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    AlphabetBlockComponent,
    SearchPanelComponent,
  ],
  imports: [
    CommonModule,
    InputsModule,
    ProductModule,
    PriceModule,
    MatIconModule
  ],
  exports: [
    SearchPanelComponent,
    AlphabetBlockComponent,
  ]

})
export class SearchModule { }
