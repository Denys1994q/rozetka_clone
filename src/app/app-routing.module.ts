import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './core/pages/home/home.component';
import { ErrorComponent } from './core/pages/error/error.component';
import { ProductComponent } from './product/pages/product/product.component';
import { ProductCharacteristicsComponent } from './product/pages/product-characteristics/product-characteristics.component';
import { ProductAllComponent } from './product/pages/product-all/product-all.component';
import { ProductCommentsComponent } from './product/pages/product-comments/product-comments.component';
import { ProductVideoComponent } from './product/pages/product-video/product-video.component';
import { ProductPhotosComponent } from './product/pages/product-photos/product-photos.component';
import { mainCategoryRoutes } from './main-categories-routes';
import { middleCategoryRoutes } from './middle-categories-routes';

const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'checkout', loadChildren: () => import('./cart/cart.module').then((m) => m.CartModule)},
    {path: 'cabinet', loadChildren: () => import('./cabinet/cabinet.module').then((m) => m.CabinetModule)},
    // головні категорії
    ...mainCategoryRoutes,
    // підкатегорії
    ...middleCategoryRoutes,
    // продукти
    {
        path: ':product/:productId',
        component: ProductComponent, children: [
            {path: '', component: ProductAllComponent},
            {path: 'characteristics', component: ProductCharacteristicsComponent},
            {path: 'comments', component: ProductCommentsComponent},
            {path: 'video', component: ProductVideoComponent},
            {path: 'photos', component: ProductPhotosComponent},
        ],
    },
    {path: 'error', component: ErrorComponent},
    {path: '**', redirectTo: '/error'},
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {initialNavigation: 'enabledBlocking'})],
    exports: [RouterModule]
})
export class AppRoutingModule { }


