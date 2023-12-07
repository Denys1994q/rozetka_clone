import { NgModule } from '@angular/core';
import { CarouselComponent } from './carousel.component';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import { CachedSrcDirective } from './iframe.directive';

@NgModule({
    declarations: [
        CarouselComponent,
        CachedSrcDirective,
    ],
    imports: [
        CommonModule,
        MatIconModule
    ],
    exports: [
        CarouselComponent,
        CachedSrcDirective
    ]
})
export class CarouselModule { }
