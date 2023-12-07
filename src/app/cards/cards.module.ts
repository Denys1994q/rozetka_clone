import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryCardComponent } from './category-card/category-card.component';
import { RouterLink } from '@angular/router';
import { CardsComponent } from './cards/cards.component';
import { MatIconModule } from '@angular/material/icon';
import { InputsModule } from '../inputs/inputs.module';
import { RatingModule } from '../rating/rating.module';
import { PriceModule } from '../price/price.module';

@NgModule({
  declarations: [
    CategoryCardComponent,
    CardsComponent
  ],
  imports: [
    CommonModule,
    RouterLink,
    MatIconModule,
    InputsModule,
    RatingModule,
    PriceModule
  ],
  exports: [
    CategoryCardComponent,
    CardsComponent
  ]
})
export class CardsModule { }
