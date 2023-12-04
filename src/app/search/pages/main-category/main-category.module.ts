import { NgModule } from '@angular/core';
import { MainCategoryComponent } from './main-category.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { SearchModule } from '../../search.module';

const routes = [
  {path: '', component: MainCategoryComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
    SearchModule
  ],
  declarations: [MainCategoryComponent],
  exports: [MainCategoryComponent]
})
export class MainCategoryModule { }