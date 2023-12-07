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
import { SocialMediaModule } from '../social-media/social-media.module';
import { SideMenuModule } from '../side-menu/side-menu.module';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ErrorComponent
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
    SocialMediaModule,
    SideMenuModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ErrorComponent
  ]
})
export class CoreModule { }
