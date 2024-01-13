import { Component} from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ScrollService } from 'src/app/core/services/scroll.service';

@Component({
  selector: 'app-product-photos',
  templateUrl: './product-photos.component.html',
  styleUrls: ['./product-photos.component.sass']
})
export class ProductPhotosComponent {
    photos!: any

    constructor(
        public productService: ProductService, 
        private scrollService: ScrollService) {}

    ngOnInit() {
        this.scrollService.scrollToTop()
        this.productService.checkActiveTab('photos')
        this.productService.setBaseView(false)
        const product = this.productService.product$.getValue();
        this.photos = product?.images.filter((image: any) => image.url)
    }

}
