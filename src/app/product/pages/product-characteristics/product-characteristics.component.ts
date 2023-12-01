import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ProductTabsService } from '../../services/product-tabs.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-product-characteristics',
  templateUrl: './product-characteristics.component.html',
  styleUrls: ['./product-characteristics.component.sass']
})
export class ProductCharacteristicsComponent {

    constructor(
        @Inject(PLATFORM_ID) private platformId: Object,
        public ProductService: ProductService, 
        private productTabsService: ProductTabsService ) {}

    ngOnInit() {
        this.ProductService.checkActiveTab('characteristics')
        if (isPlatformBrowser(this.platformId)) {
            window.scrollTo({top: 0, behavior: "smooth"});
        }
        this.productTabsService.setBaseView(false)
    }

}
