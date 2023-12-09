import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsideComponent } from './aside.component';
import { MatIconModule } from '@angular/material/icon';
import { SkeletonModule } from '../skeleton/skeleton.module';
import { RouterModule } from '@angular/router';
import { SocialMediaComponent } from './components/social-media/social-media.component';

@NgModule({
  declarations: [
    AsideComponent,
    SocialMediaComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    SkeletonModule
  ],
  exports: [
    AsideComponent,
    SocialMediaComponent
  ]
})
export class AsideModule { }
