import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsideComponent } from './aside.component';
import { MatIconModule } from '@angular/material/icon';
import { SkeletonModule } from '../skeleton/skeleton.module';
import { RouterModule } from '@angular/router';
import { SocialMediaModule } from '../social-media/social-media.module';

@NgModule({
  declarations: [
    AsideComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    SkeletonModule,
    SocialMediaModule
  ],
  exports: [
    AsideComponent
  ]
})
export class AsideModule { }
