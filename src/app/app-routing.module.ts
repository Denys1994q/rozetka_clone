import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './core/pages/home/home.component';
import { MainCategoryComponent } from './search/pages/main-category/main-category.component';
import { MiddleCategoryComponent } from './search/pages/middle-category/middle-category.component';
import { ErrorComponent } from './core/pages/error/error.component';
import { ProductComponent } from './product/pages/product/product.component';
import { ProductCharacteristicsComponent } from './product/pages/product-characteristics/product-characteristics.component';
import { ProductAllComponent } from './product/pages/product-all/product-all.component';
import { ProductCommentsComponent } from './product/pages/product-comments/product-comments.component';
import { ProductVideoComponent } from './product/pages/product-video/product-video.component';
import { ProductPhotosComponent } from './product/pages/product-photos/product-photos.component';

const middleCategoriesTitlesRoutes: any = []
const middleCategoriesTitles = ['mobile-phones/c80003', 'all-tv/c80037', 'dvd-hd-players/c80011', 'recivers/c80013', 'tuners/c80015', 'portativnaya-ehlektronika/c130309', 'e-books/c80023', 'mp3/c80016', 'recorders/p202591', 'docing_stations/c236805', 'portativnaya-ehlektronika/c130310', 'universalnye-mobilnye-batarei/c387969', 'zaryadnie-stantsii/c4674585', 'fotoelektricheskie-paneli/c4629920', 'dvd-hd-players/c80011', 'notebooks/c800041', 'accessories/c800892', 'motherboards/c80082', 'processors/c80083', 'soundcards/c80088', 'office-equipment/c802543', 'printers/c80007', 'scanners/c80028', 'tablets/c802554', 'clean_robots/c237815', 'coffee_machines/c80164', 'bigbt/c80080', 'refrigerators/c80125', 'washing_machines/c80124', 'tehnika-dlya-kuhni/c435974', 'cleaning/c435964', 'beauty/c80256', 'playstation-store/c800801', 'playstation-5/k80126', 'gamepads-playstation/k80125', 'velosipedy-i-aksessuary/c83882', 'fishing/c84703', 'reels/c84712', 'skovorody/c4626754', 'kresla/c4657815', 'mebel/c152458', 'videocards/c80087', 'hdd/c80084', 'ssd/c80109', 'office-phones/c80029', 'freezers/c80203', 'men_electric_shavers/c81226']

middleCategoriesTitles.map(item => {
    middleCategoriesTitlesRoutes.push({path: item, component: MiddleCategoryComponent})
})

const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'checkout', loadChildren: () => import('./cart/cart.module').then((m) => m.CartModule)},
    {path: 'cabinet', loadChildren: () => import('./cabinet/cabinet.module').then((m) => m.CabinetModule)},
    // головні категорії
    {path: 'household-appliances/c80254', component: MainCategoryComponent},
    {path: 'telefony-tv-i-ehlektronika/c4627949', component: MainCategoryComponent},
    {path: 'computers-notebooks/c80253', component: MainCategoryComponent},
    {path: 'game-zone/c80255', component: MainCategoryComponent},
    {path: 'sport-i-uvlecheniya/c4627893', component: MainCategoryComponent},
    {path: 'tovary-dlya-doma/c2394287', component: MainCategoryComponent},
    {path: 'test', component: ErrorComponent},
    {path: 'test/:id', component: ErrorComponent},
    // підкатегорії
    ...middleCategoriesTitlesRoutes,
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
    imports: [RouterModule.forRoot(routes, {initialNavigation: 'enabledNonBlocking'})],
    exports: [RouterModule]
})
export class AppRoutingModule { }


