import { NgModule } from '@angular/core';
import { RatingComponent } from './rating.component';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    RatingComponent
  ],
  imports: [
    CommonModule,
    MatIconModule
  ],
  exports: [
    RatingComponent
  ]
})
export class RatingModule { }
