import { NgModule } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './pages/home/home.component';
import { ErrorComponent } from './pages/error/error.component';
import { ProductModule } from '../product/product.module';
import { HttpClientModule } from '@angular/common/http';
import { CartModule } from '../cart/cart.module';
import { CarouselModule } from '../carousel/carousel.module';
import { InputsModule } from '../inputs/inputs.module';
import { SkeletonModule } from '../skeleton/skeleton.module';
import { AsideModule } from '../aside/aside.module';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { MatBadgeModule } from '@angular/material/badge';
import { CardsModule } from '../cards/cards.module';
import { PriceModule } from '../price/price.module';

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
    InputsModule,
    CarouselModule,
    ProductModule,
    SharedModule,
    CartModule,
    SkeletonModule,
    AsideModule,
    MatBadgeModule,
    CardsModule,
    PriceModule
  ],
  exports: [
    ErrorComponent,
    HeaderComponent,
    FooterComponent
  ]
})
export class CoreModule { }
