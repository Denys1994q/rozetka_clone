import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PricePanelComponent } from './price-panel/price-panel.component';
import { PriceComponent } from './price/price.component';
import { FormsModule } from '@angular/forms';
import {MatSliderModule} from '@angular/material/slider'

@NgModule({
  declarations: [
    PricePanelComponent,
    PriceComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatSliderModule
  ],
  exports: [
    PricePanelComponent,
    PriceComponent
  ]
})
export class PriceModule { }
