import { NgModule } from '@angular/core';
import { MainCategoryComponent } from './main-category.component';
import { RouterModule } from '@angular/router';
import { CarouselModule } from 'src/app/carousel/carousel.module';
import { BreadcrumbsModule } from 'src/app/breadcrumbs/breadcrumbs.module';
import { SkeletonModule } from 'src/app/skeleton/skeleton.module';
import { CommonModule } from '@angular/common';
import { CardsModule } from 'src/app/cards/cards.module';
import { ErrorModule } from 'src/app/error/error.module';

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
    CardsModule,
    ErrorModule
  ],
  declarations: [MainCategoryComponent]
})
export class MainCategoryModule { }