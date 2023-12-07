import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatSliderModule} from '@angular/material/slider'
import { MatIconModule } from '@angular/material/icon';
// форми
import { SearchResultComponent } from './components/search-result/search-result.component';
import { PricePanelComponent } from './components/price-panel/price-panel.component';
import { UserInfopanelComponent } from './components/user-infopanel/user-infopanel.component';
import { MatBadgeModule } from '@angular/material/badge';
import { RouterModule } from '@angular/router';
import { SnackBarComponent } from './components/snackBar/snack-bar.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SideBannerComponent } from './components/side-banner/side-banner.component';
import { InputsModule } from '../inputs/inputs.module';
import { BtnsModule } from '../btns/btns.module';

@NgModule({
  declarations: [ 
    SearchResultComponent,
    PricePanelComponent,
    UserInfopanelComponent,
    SnackBarComponent,
    SideBannerComponent
  ],
  imports: [
    CommonModule, 
    MatIconModule, 
    MatSliderModule,
    MatBadgeModule,
    RouterModule,
    InputsModule,
    BtnsModule
  ],
  exports: [
    CommonModule,
    RouterModule,
    MatIconModule, 
    MatSliderModule, 
    MatBadgeModule,
    MatProgressSpinnerModule,
    SearchResultComponent,
    PricePanelComponent,
    UserInfopanelComponent,
    SnackBarComponent,
    SideBannerComponent
  ]
})
export class SharedModule { }
