import { Component} from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ProductTabsService } from '../../services/product-tabs.service';
import { ScrollService } from 'src/app/core/services/scroll.service';

@Component({
  selector: 'app-product-video',
  templateUrl: './product-video.component.html',
  styleUrls: ['./product-video.component.sass']
})
export class ProductVideoComponent {

    constructor(
        private scrollService: ScrollService,
        public productService: ProductService, 
        private productTabsService: ProductTabsService) {}

    ngOnInit() {
        this.scrollService.scrollToTop()
        this.productService.checkActiveTab('video')
        this.productTabsService.setBaseView(false)
    }

}
