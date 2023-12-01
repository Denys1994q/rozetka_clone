import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ProductTabsService } from '../../services/product-tabs.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-product-video',
  templateUrl: './product-video.component.html',
  styleUrls: ['./product-video.component.sass']
})
export class ProductVideoComponent {

    constructor(
        @Inject(PLATFORM_ID) private platformId: Object,
        public productService: ProductService, 
        private productTabsService: ProductTabsService) {}

    ngOnInit() {
        if (isPlatformBrowser(this.platformId)) {
            window.scrollTo({top: 0, behavior: "smooth"});
        }
        this.productService.checkActiveTab('video')
        this.productTabsService.setBaseView(false)
    }

}
