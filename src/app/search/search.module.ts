import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ProductModule } from '../product/product.module';
import { AlphabetBlockComponent } from './components/alphabet-block/alphabet-block.component';
import { CategoryCardComponent } from './components/category-card/category-card.component';
import { SearchPanelComponent } from './components/search-panel/search-panel.component';
import { MainCategoryComponent } from './pages/main-category/main-category.component';
import { MiddleCategoryComponent } from './pages/middle-category/middle-category.component';
// import { AppRoutingModule } from '../app-routing.module';
// import { MainCategoryModule } from './pages/main-category/main-category.module';
// import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AlphabetBlockComponent,
    CategoryCardComponent,
    SearchPanelComponent,
    // MainCategoryComponent,
    MiddleCategoryComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProductModule,
    // AppRoutingModule
  ],
  exports: [
    CategoryCardComponent
  ]

})
export class SearchModule { }
