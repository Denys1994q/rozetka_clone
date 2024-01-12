import { Component} from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ScrollService } from 'src/app/core/services/scroll.service';
import { IProduct } from '../../models/product.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-photos',
  templateUrl: './product-photos.component.html',
  styleUrls: ['./product-photos.component.sass']
})
export class ProductPhotosComponent {
    photos!: any
    product: IProduct | null = null
    productSubscription!: Subscription

    constructor(
        public productService: ProductService, 
        private scrollService: ScrollService) {
            this.productSubscription = this.productService.product$.subscribe(prod => {
                this.product = prod
            })
        }

    ngOnInit() {
        this.scrollService.scrollToTop()
        this.productService.checkActiveTab('photos')
        this.productService.setBaseView(false)
        if (this.product) {
            this.photos = this.product.images.filter((image: any) => image.url)
        }
    }

    ngOnDestroy() {
        this.productSubscription.unsubscribe();
    }

}
