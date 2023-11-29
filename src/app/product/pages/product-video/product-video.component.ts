import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ProductTabsService } from '../../services/product-tabs.service';

@Component({
  selector: 'app-product-video',
  templateUrl: './product-video.component.html',
  styleUrls: ['./product-video.component.sass']
})
export class ProductVideoComponent {

    constructor(public productService: ProductService, private productTabsService: ProductTabsService) {}

    ngOnInit() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
        this.productService.checkActiveTab('video')
        this.productTabsService.setBaseView(false)
    }

}
