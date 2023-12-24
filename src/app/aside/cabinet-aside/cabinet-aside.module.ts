import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { CabinetAsideComponent } from './cabinet-aside.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    CabinetAsideComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule
  ],
  exports: [
    CabinetAsideComponent
  ]
})
export class CabinetAsideModule { }
