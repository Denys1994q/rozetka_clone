import { NgModule } from '@angular/core';
import { MainCategoryComponent } from './main-category.component';
import { RouterModule } from '@angular/router';
import { SearchModule } from '../../search.module';
import { CarouselModule } from 'src/app/carousel/carousel.module';
import { BreadcrumbsModule } from 'src/app/breadcrumbs/breadcrumbs.module';
import { SkeletonModule } from 'src/app/skeleton/skeleton.module';
import { CommonModule } from '@angular/common';

const routes = [
  {path: '', component: MainCategoryComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    CarouselModule,
    BreadcrumbsModule,
    SkeletonModule,
    SearchModule
  ],
  declarations: [MainCategoryComponent],
  exports: [MainCategoryComponent]
})
export class MainCategoryModule { }