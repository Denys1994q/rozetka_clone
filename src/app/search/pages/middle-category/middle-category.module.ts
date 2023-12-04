import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MiddleCategoryComponent } from './middle-category.component';
import { RouterModule } from '@angular/router';
import { SearchModule } from '../../search.module';
import { ProductModule } from 'src/app/product/product.module';
import { SharedModule } from 'src/app/shared/shared.module';

const routes = [
  {path: '', component: MiddleCategoryComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule,
    SearchModule,
    ProductModule
  ],
  declarations: [MiddleCategoryComponent],
  exports: [MiddleCategoryComponent]
})
export class MiddleCategoryModule { }