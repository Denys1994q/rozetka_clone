import { NgModule } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './pages/home/home.component';
import { ErrorComponent } from './pages/error/error.component';
import { ProductModule } from '../product/product.module';
import { HttpClientModule } from '@angular/common/http';
import { CarouselModule } from '../carousel/carousel.module';
import { InputsModule } from '../inputs/inputs.module';
import { SkeletonModule } from '../skeleton/skeleton.module';
import { CategoriesAsideModule } from '../aside/categories-aside/categories-aside.module';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { CardsModule } from '../cards/cards.module';
import { PriceModule } from '../price/price.module';
import { RouterModule } from '@angular/router';
import { BtnsModule } from '../btns/btns.module';
import { CartModule } from '../cart/cart.module';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ErrorComponent,
    SideMenuComponent
  ],
  imports: [
    HttpClientModule,
    RouterModule,
    InputsModule,
    CarouselModule,
    ProductModule,
    SharedModule,
    SkeletonModule,
    CategoriesAsideModule,
    CardsModule,
    PriceModule,
    BtnsModule,
    CartModule
  ],
  exports: [
    ErrorComponent,
    HeaderComponent,
    FooterComponent
  ]
})
export class CoreModule { }
