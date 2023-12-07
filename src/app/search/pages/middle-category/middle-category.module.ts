import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MiddleCategoryComponent } from './middle-category.component';
import { RouterModule } from '@angular/router';
import { SearchModule } from '../../search.module';
import { ProductModule } from 'src/app/product/product.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { InputsModule } from 'src/app/inputs/inputs.module';
import { BreadcrumbsModule } from 'src/app/breadcrumbs/breadcrumbs.module';
import { SkeletonModule } from 'src/app/skeleton/skeleton.module';
import { BtnsModule } from 'src/app/btns/btns.module';
import { MatIconModule } from '@angular/material/icon';


const routes = [
  {path: '', component: MiddleCategoryComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    MatIconModule,
    InputsModule,
    CommonModule,
    SharedModule,
    SearchModule,
    BreadcrumbsModule,
    ProductModule,
    SkeletonModule,
    BtnsModule
  ],
  declarations: [MiddleCategoryComponent],
  exports: [MiddleCategoryComponent]
})
export class MiddleCategoryModule { }