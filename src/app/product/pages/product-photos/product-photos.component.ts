import { Component,  Inject, PLATFORM_ID } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ProductTabsService } from '../../services/product-tabs.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-product-photos',
  templateUrl: './product-photos.component.html',
  styleUrls: ['./product-photos.component.sass']
})
export class ProductPhotosComponent {
    photos!: any

    constructor(
        @Inject(PLATFORM_ID) private platformId: Object,
        public productService: ProductService, 
        private productTabsService: ProductTabsService) {}

    ngOnInit() {
        if (isPlatformBrowser(this.platformId)) {
            window.scrollTo({top: 0, behavior: "smooth"});
        }
        this.productService.checkActiveTab('photos')
        this.productTabsService.setBaseView(false)
        this.photos = this.productService.product.images.filter((image: any) => image.url)
    }

}
