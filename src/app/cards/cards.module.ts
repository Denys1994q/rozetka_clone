import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryCardComponent } from './category-card/category-card.component';
import { RouterLink } from '@angular/router';
import { CardsComponent } from './cards/cards.component';
import { MatIconModule } from '@angular/material/icon';
import { InputsModule } from '../inputs/inputs.module';
import { RatingModule } from '../rating/rating.module';
import { PriceModule } from '../price/price.module';
import { CardComponent } from './card/card.component';
import { BtnsModule } from '../btns/btns.module';

@NgModule({
  declarations: [
    CategoryCardComponent,
    CardsComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
    RouterLink,
    MatIconModule,
    InputsModule,
    RatingModule,
    PriceModule,
    BtnsModule,
  ],
  exports: [
    CategoryCardComponent,
    CardsComponent,
    CardComponent
  ],
})
export class CardsModule { }
