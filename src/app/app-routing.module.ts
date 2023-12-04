import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './core/pages/home/home.component';
import { MiddleCategoryComponent } from './search/pages/middle-category/middle-category.component';
import { ErrorComponent } from './core/pages/error/error.component';
import { ProductComponent } from './product/pages/product/product.component';
import { ProductCharacteristicsComponent } from './product/pages/product-characteristics/product-characteristics.component';
import { ProductAllComponent } from './product/pages/product-all/product-all.component';
import { ProductCommentsComponent } from './product/pages/product-comments/product-comments.component';
import { ProductVideoComponent } from './product/pages/product-video/product-video.component';
import { ProductPhotosComponent } from './product/pages/product-photos/product-photos.component';
import { MainCategoryModule } from './search/pages/main-category/main-category.module';
import { MiddleCategoryModule } from './search/pages/middle-category/middle-category.module';

const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'checkout', loadChildren: () => import('./cart/cart.module').then((m) => m.CartModule)},
    {path: 'cabinet', loadChildren: () => import('./cabinet/cabinet.module').then((m) => m.CabinetModule)},
    // головні категорії
    {path: 'household-appliances/c80254', loadChildren: () => import('./search/pages/main-category/main-category.module').then((m) => m.MainCategoryModule)},
    {path: 'telefony-tv-i-ehlektronika/c4627949', loadChildren: () => import('./search/pages/main-category/main-category.module').then((m) => m.MainCategoryModule)},
    {path: 'computers-notebooks/c80253', loadChildren: () => import('./search/pages/main-category/main-category.module').then((m) => m.MainCategoryModule)},
    {path: 'game-zone/c80255', loadChildren: () => import('./search/pages/main-category/main-category.module').then((m) => m.MainCategoryModule)},
    {path: 'sport-i-uvlecheniya/c4627893',loadChildren: () => import('./search/pages/main-category/main-category.module').then((m) => m.MainCategoryModule)},
    {path: 'tovary-dlya-doma/c2394287', loadChildren: () => import('./search/pages/main-category/main-category.module').then((m) => m.MainCategoryModule)},
    // підкатегорії
    {path: 'mobile-phones/c80003', loadChildren: () => import('./search/pages/middle-category/middle-category.module').then((m) => m.MiddleCategoryModule)},
    {path: 'all-tv/c80037', loadChildren: () => import('./search/pages/middle-category/middle-category.module').then((m) => m.MiddleCategoryModule)},
    {path: 'dvd-hd-players/c80011', loadChildren: () => import('./search/pages/middle-category/middle-category.module').then((m) => m.MiddleCategoryModule)},
    {path: 'recivers/c80013', loadChildren: () => import('./search/pages/middle-category/middle-category.module').then((m) => m.MiddleCategoryModule)},
    {path: 'tuners/c80015', loadChildren: () => import('./search/pages/middle-category/middle-category.module').then((m) => m.MiddleCategoryModule)},
    {path: 'portativnaya-ehlektronika/c130309', loadChildren: () => import('./search/pages/middle-category/middle-category.module').then((m) => m.MiddleCategoryModule)},
    {path: 'e-books/c80023', loadChildren: () => import('./search/pages/middle-category/middle-category.module').then((m) => m.MiddleCategoryModule)},
    {path: 'mp3/c80016', loadChildren: () => import('./search/pages/middle-category/middle-category.module').then((m) => m.MiddleCategoryModule)},
    {path: 'recorders/p202591', loadChildren: () => import('./search/pages/middle-category/middle-category.module').then((m) => m.MiddleCategoryModule)},
    {path: 'docing_stations/c236805', loadChildren: () => import('./search/pages/middle-category/middle-category.module').then((m) => m.MiddleCategoryModule)},
    {path: 'portativnaya-ehlektronika/c130310', loadChildren: () => import('./search/pages/middle-category/middle-category.module').then((m) => m.MiddleCategoryModule)},
    {path: 'universalnye-mobilnye-batarei/c387969', loadChildren: () => import('./search/pages/middle-category/middle-category.module').then((m) => m.MiddleCategoryModule)},
    {path: 'zaryadnie-stantsii/c4674585', loadChildren: () => import('./search/pages/middle-category/middle-category.module').then((m) => m.MiddleCategoryModule)},
    {path: 'fotoelektricheskie-paneli/c4629920', loadChildren: () => import('./search/pages/middle-category/middle-category.module').then((m) => m.MiddleCategoryModule)},
    {path: 'dvd-hd-players/c80011', loadChildren: () => import('./search/pages/middle-category/middle-category.module').then((m) => m.MiddleCategoryModule)},
    {path: 'notebooks/c800041', loadChildren: () => import('./search/pages/middle-category/middle-category.module').then((m) => m.MiddleCategoryModule)},
    {path: 'accessories/c800892', loadChildren: () => import('./search/pages/middle-category/middle-category.module').then((m) => m.MiddleCategoryModule)},
    {path: 'motherboards/c80082', loadChildren: () => import('./search/pages/middle-category/middle-category.module').then((m) => m.MiddleCategoryModule)},
    {path: 'processors/c80083', loadChildren: () => import('./search/pages/middle-category/middle-category.module').then((m) => m.MiddleCategoryModule)},
    {path: 'soundcards/c80088', loadChildren: () => import('./search/pages/middle-category/middle-category.module').then((m) => m.MiddleCategoryModule)},
    {path: 'office-equipment/c802543', loadChildren: () => import('./search/pages/middle-category/middle-category.module').then((m) => m.MiddleCategoryModule)},
    {path: 'printers/c80007', loadChildren: () => import('./search/pages/middle-category/middle-category.module').then((m) => m.MiddleCategoryModule)},
    {path: 'scanners/c80028', loadChildren: () => import('./search/pages/middle-category/middle-category.module').then((m) => m.MiddleCategoryModule)},
    {path: 'tablets/c802554', loadChildren: () => import('./search/pages/middle-category/middle-category.module').then((m) => m.MiddleCategoryModule)},
    {path: 'clean_robots/c237815', loadChildren: () => import('./search/pages/middle-category/middle-category.module').then((m) => m.MiddleCategoryModule)},
    {path: 'coffee_machines/c80164', loadChildren: () => import('./search/pages/middle-category/middle-category.module').then((m) => m.MiddleCategoryModule)},
    {path: 'bigbt/c80080', loadChildren: () => import('./search/pages/middle-category/middle-category.module').then((m) => m.MiddleCategoryModule)},
    {path: 'refrigerators/c80125', loadChildren: () => import('./search/pages/middle-category/middle-category.module').then((m) => m.MiddleCategoryModule)},
    {path: 'washing_machines/c80124', loadChildren: () => import('./search/pages/middle-category/middle-category.module').then((m) => m.MiddleCategoryModule)},
    {path: 'tehnika-dlya-kuhni/c435974', loadChildren: () => import('./search/pages/middle-category/middle-category.module').then((m) => m.MiddleCategoryModule)},
    {path: 'cleaning/c435964', loadChildren: () => import('./search/pages/middle-category/middle-category.module').then((m) => m.MiddleCategoryModule)},
    {path: 'beauty/c80256', loadChildren: () => import('./search/pages/middle-category/middle-category.module').then((m) => m.MiddleCategoryModule)},
    {path: 'playstation-store/c800801', loadChildren: () => import('./search/pages/middle-category/middle-category.module').then((m) => m.MiddleCategoryModule)},
    {path: 'playstation-5/k80126', loadChildren: () => import('./search/pages/middle-category/middle-category.module').then((m) => m.MiddleCategoryModule)},
    {path: 'gamepads-playstation/k80125', loadChildren: () => import('./search/pages/middle-category/middle-category.module').then((m) => m.MiddleCategoryModule)},
    {path: 'velosipedy-i-aksessuary/c83882', loadChildren: () => import('./search/pages/middle-category/middle-category.module').then((m) => m.MiddleCategoryModule)},
    {path: 'fishing/c84703', loadChildren: () => import('./search/pages/middle-category/middle-category.module').then((m) => m.MiddleCategoryModule)},
    {path: 'reels/c84712', loadChildren: () => import('./search/pages/middle-category/middle-category.module').then((m) => m.MiddleCategoryModule)},
    {path: 'skovorody/c4626754', loadChildren: () => import('./search/pages/middle-category/middle-category.module').then((m) => m.MiddleCategoryModule)},
    {path: 'kresla/c4657815', loadChildren: () => import('./search/pages/middle-category/middle-category.module').then((m) => m.MiddleCategoryModule)},
    {path: 'mebel/c152458', loadChildren: () => import('./search/pages/middle-category/middle-category.module').then((m) => m.MiddleCategoryModule)},
    {path: 'videocards/c80087', loadChildren: () => import('./search/pages/middle-category/middle-category.module').then((m) => m.MiddleCategoryModule)},
    {path: 'hdd/c80084', loadChildren: () => import('./search/pages/middle-category/middle-category.module').then((m) => m.MiddleCategoryModule)},
    {path: 'ssd/c80109', loadChildren: () => import('./search/pages/middle-category/middle-category.module').then((m) => m.MiddleCategoryModule)},
    {path: 'office-phones/c80029', loadChildren: () => import('./search/pages/middle-category/middle-category.module').then((m) => m.MiddleCategoryModule)},
    {path: 'freezers/c80203', loadChildren: () => import('./search/pages/middle-category/middle-category.module').then((m) => m.MiddleCategoryModule)},
    {path: 'men_electric_shavers/c81226', loadChildren: () => import('./search/pages/middle-category/middle-category.module').then((m) => m.MiddleCategoryModule)},
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


