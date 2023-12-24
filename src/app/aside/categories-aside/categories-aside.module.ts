import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesAsideComponent } from './categories-aside.component';
import { MatIconModule } from '@angular/material/icon';
import { SkeletonModule } from '../../skeleton/skeleton.module';
import { RouterModule } from '@angular/router';
import { SocialMediaComponent } from '../social-media/social-media.component';

@NgModule({
  declarations: [
    CategoriesAsideComponent,
    SocialMediaComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    SkeletonModule
  ],
  exports: [
    CategoriesAsideComponent,
    SocialMediaComponent
  ]
})
export class CategoriesAsideModule { }
