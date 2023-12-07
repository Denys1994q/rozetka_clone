import { NgModule } from '@angular/core';
import { CharacteristicsBlockComponent } from './components/characteristics-block/characteristics-block.component';
import { SharedModule } from '../shared/shared.module';
import { CommentsPanelComponent } from './components/comments-panel/comments-panel.component';
import { ColorPaletteComponent } from './components/color-palette/color-palette.component';
import { CardsComponent } from './components/cards/cards.component';
import { PriceComponent } from './components/price/price.component';
import { VideoCardsComponent } from './components/video-cards/video-cards.component';
import { ProductComponent } from './pages/product/product.component';
import { ProductAllComponent } from './pages/product-all/product-all.component';
import { ProductCharacteristicsComponent } from './pages/product-characteristics/product-characteristics.component';
import { ProductCommentsComponent } from './pages/product-comments/product-comments.component';
import { ProductPhotosComponent } from './pages/product-photos/product-photos.component';
import { ProductVideoComponent } from './pages/product-video/product-video.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CarouselModule } from '../carousel/carousel.module';
import { CommentModule } from '../comment/comment.module';
import { InputsModule } from '../inputs/inputs.module';
import { RatingModule } from '../rating/rating.module';
import { BreadcrumbsModule } from '../breadcrumbs/breadcrumbs.module';
import { SkeletonModule } from '../skeleton/skeleton.module';
// import { RouterModule } from '@angular/router';

// const routes = [
//   {
//     path: '', 
//     component: ProductComponent, children: [
//       { path: '', component: ProductAllComponent },
//       { path: 'characteristics', component: ProductCharacteristicsComponent },
//       { path: 'comments', component: ProductCommentsComponent },
//       { path: 'video', component: ProductVideoComponent },
//       { path: 'photos', component: ProductPhotosComponent },
//     ],
//   },
// ];

@NgModule({
  declarations: [
    CharacteristicsBlockComponent,
    CommentsPanelComponent,
    ColorPaletteComponent,
    CardsComponent,
    PriceComponent,
    VideoCardsComponent,
    ProductComponent,
    ProductAllComponent,
    ProductCharacteristicsComponent,
    ProductCommentsComponent,
    ProductPhotosComponent,
    ProductVideoComponent,
    TabsComponent
  ],
  imports: [
    // RouterModule.forChild(routes),
    InputsModule,
    BreadcrumbsModule,
    RatingModule,
    CarouselModule,
    CommentModule,
    SharedModule,
    MatSnackBarModule,
    SkeletonModule
  ], 
  exports: [
    CharacteristicsBlockComponent,
    CardsComponent,
    VideoCardsComponent,
    PriceComponent,
  ]
})
export class ProductModule { }
