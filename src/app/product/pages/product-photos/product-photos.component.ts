import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ProductTabsService } from '../../services/product-tabs.service';

@Component({
  selector: 'app-product-photos',
  templateUrl: './product-photos.component.html',
  styleUrls: ['./product-photos.component.sass']
})
export class ProductPhotosComponent {
    photos!: any

    constructor(public productService: ProductService, private productTabsService: ProductTabsService) {}

    ngOnInit() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
        this.productService.checkActiveTab('photos')
        this.productTabsService.setBaseView(false)
        this.photos = this.productService.product.images.filter((image: any) => image.url)
    }

}
