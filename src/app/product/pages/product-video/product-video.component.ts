import { Component} from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ScrollService } from 'src/app/core/services/scroll.service';
import { IProduct } from '../../models/product.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-video',
  templateUrl: './product-video.component.html',
  styleUrls: ['./product-video.component.sass']
})
export class ProductVideoComponent {
    product: IProduct | null = null
    productSubscription!: Subscription

    constructor(
        private scrollService: ScrollService,
        public productService: ProductService) {
            this.productSubscription = this.productService.product$.subscribe(prod => {
                this.product = prod
            })
        }

    ngOnInit() {
        this.scrollService.scrollToTop()
        this.productService.checkActiveTab('video')
        this.productService.setBaseView(false)
    }

    ngOnDestroy() {
        this.productSubscription.unsubscribe();
    }

}
