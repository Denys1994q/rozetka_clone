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
    {path: 'mobile-phones/c80003', component: MiddleCategoryComponent},
    {path: 'all-tv/c80037', component: MiddleCategoryComponent},
    {path: 'dvd-hd-players/c80011', component: MiddleCategoryComponent},
    {path: 'recivers/c80013', component: MiddleCategoryComponent},
    {path: 'tuners/c80015', component: MiddleCategoryComponent},
    {path: 'portativnaya-ehlektronika/c130309', component: MiddleCategoryComponent},
    {path: 'e-books/c80023', component: MiddleCategoryComponent},
    {path: 'mp3/c80016', component: MiddleCategoryComponent},
    {path: 'recorders/p202591', component: MiddleCategoryComponent},
    {path: 'docing_stations/c236805', component: MiddleCategoryComponent},
    {path: 'portativnaya-ehlektronika/c130310', component: MiddleCategoryComponent},
    {path: 'universalnye-mobilnye-batarei/c387969', component: MiddleCategoryComponent},
    {path: 'zaryadnie-stantsii/c4674585', component: MiddleCategoryComponent},
    {path: 'fotoelektricheskie-paneli/c4629920', component: MiddleCategoryComponent},
    {path: 'dvd-hd-players/c80011', component: MiddleCategoryComponent},
    {path: 'notebooks/c800041', component: MiddleCategoryComponent},
    {path: 'accessories/c800892', component: MiddleCategoryComponent},
    {path: 'motherboards/c80082', component: MiddleCategoryComponent},
    {path: 'processors/c80083', component: MiddleCategoryComponent},
    {path: 'soundcards/c80088', component: MiddleCategoryComponent},
    {path: 'office-equipment/c802543', component: MiddleCategoryComponent},
    {path: 'printers/c80007', component: MiddleCategoryComponent},
    {path: 'scanners/c80028', component: MiddleCategoryComponent},
    {path: 'tablets/c802554', component: MiddleCategoryComponent},
    {path: 'clean_robots/c237815', component: MiddleCategoryComponent},
    {path: 'coffee_machines/c80164', component: MiddleCategoryComponent},
    {path: 'bigbt/c80080', component: MiddleCategoryComponent},
    {path: 'refrigerators/c80125', component: MiddleCategoryComponent},
    {path: 'washing_machines/c80124', component: MiddleCategoryComponent},
    {path: 'tehnika-dlya-kuhni/c435974', component: MiddleCategoryComponent},
    {path: 'cleaning/c435964', component: MiddleCategoryComponent},
    {path: 'beauty/c80256', component: MiddleCategoryComponent},
    {path: 'playstation-store/c800801', component: MiddleCategoryComponent},
    {path: 'playstation-5/k80126', component: MiddleCategoryComponent},
    {path: 'gamepads-playstation/k80125', component: MiddleCategoryComponent},
    {path: 'velosipedy-i-aksessuary/c83882', component: MiddleCategoryComponent},
    {path: 'fishing/c84703', component: MiddleCategoryComponent},
    {path: 'reels/c84712', component: MiddleCategoryComponent},
    {path: 'skovorody/c4626754', component: MiddleCategoryComponent},
    {path: 'kresla/c4657815', component: MiddleCategoryComponent},
    {path: 'mebel/c152458', component: MiddleCategoryComponent},
    {path: 'videocards/c80087', component: MiddleCategoryComponent},
    {path: 'hdd/c80084', component: MiddleCategoryComponent},
    {path: 'ssd/c80109', component: MiddleCategoryComponent},
    {path: 'office-phones/c80029', component: MiddleCategoryComponent},
    {path: 'freezers/c80203', component: MiddleCategoryComponent},
    {path: 'men_electric_shavers/c81226', component: MiddleCategoryComponent},
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


