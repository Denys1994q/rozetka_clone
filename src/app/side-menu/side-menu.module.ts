import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideMenuComponent } from './side-menu.component';
import { SocialMediaModule } from '../social-media/social-media.module';
import { MatIconModule } from '@angular/material/icon';
import { InputsModule } from '../inputs/inputs.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    SideMenuComponent
  ],
  imports: [
    CommonModule,
    SocialMediaModule,
    MatIconModule,
    InputsModule,
    SharedModule
  ],
  exports: [
    SideMenuComponent
  ]
})
export class SideMenuModule { }
