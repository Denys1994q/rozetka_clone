import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MiddleCategoryComponent } from './middle-category.component';
import { RouterModule } from '@angular/router';
import { SkeletonModule } from 'src/app/skeleton/skeleton.module';
import { ProductModule } from 'src/app/product/product.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { InputsModule } from 'src/app/inputs/inputs.module';
import { BreadcrumbsModule } from 'src/app/breadcrumbs/breadcrumbs.module';
import { BtnsModule } from 'src/app/btns/btns.module';
import { MatIconModule } from '@angular/material/icon';
import { CardsModule } from 'src/app/cards/cards.module';
import { SearchPanelComponent } from '../../components/search-panel/search-panel.component';
import { PriceModule } from 'src/app/price/price.module';
import { AlphabetBlockComponent } from '../../components/alphabet-block/alphabet-block.component';

const routes = [
  {path: '', component: MiddleCategoryComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    MatIconModule,
    InputsModule,
    CommonModule,
    SharedModule,
    BreadcrumbsModule,
    ProductModule,
    SkeletonModule,
    BtnsModule,
    CardsModule,
    PriceModule
  ],
  declarations: [
    MiddleCategoryComponent,
    SearchPanelComponent,
    AlphabetBlockComponent
  ],
  exports: []
})
export class MiddleCategoryModule { }