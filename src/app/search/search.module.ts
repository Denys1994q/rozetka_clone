import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ProductModule } from '../product/product.module';
import { AlphabetBlockComponent } from './components/alphabet-block/alphabet-block.component';
import { CategoryCardComponent } from './components/category-card/category-card.component';
import { SearchPanelComponent } from './components/search-panel/search-panel.component';
import { InputsModule } from '../inputs/inputs.module';

@NgModule({
  declarations: [
    AlphabetBlockComponent,
    CategoryCardComponent,
    SearchPanelComponent,
  ],
  imports: [
    CommonModule,
    InputsModule,
    SharedModule,
    ProductModule,
  ],
  exports: [
    CategoryCardComponent,
    SearchPanelComponent,
    AlphabetBlockComponent,
  ]

})
export class SearchModule { }
