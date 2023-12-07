import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
// форми
import { SearchResultComponent } from './components/search-result/search-result.component';
import { UserInfopanelComponent } from './components/user-infopanel/user-infopanel.component';
import { RouterModule } from '@angular/router';
import { SnackBarComponent } from './components/snackBar/snack-bar.component';
import { SideBannerComponent } from './components/side-banner/side-banner.component';
import { InputsModule } from '../inputs/inputs.module';
import { BtnsModule } from '../btns/btns.module';

@NgModule({
  declarations: [ 
    SearchResultComponent,
    UserInfopanelComponent,
    SnackBarComponent,
    SideBannerComponent
  ],
  imports: [
    CommonModule, 
    MatIconModule, 
    RouterModule,
    InputsModule,
    BtnsModule
  ],
  exports: [
    CommonModule,
    RouterModule,
    MatIconModule, 
    SearchResultComponent,
    UserInfopanelComponent,
    SnackBarComponent,
    SideBannerComponent
  ]
})
export class SharedModule { }
