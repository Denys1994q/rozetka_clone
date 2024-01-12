import { Component} from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ScrollService } from 'src/app/core/services/scroll.service';
import { IProduct } from '../../models/product.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'

@Component({
  selector: 'app-product-video',
  templateUrl: './product-video.component.html',
  styleUrls: ['./product-video.component.sass']
})
export class ProductVideoComponent {
    product: IProduct | null = null

    constructor(
        private scrollService: ScrollService,
        public productService: ProductService) {
            this.productService.product$.pipe(takeUntilDestroyed()).subscribe(prod => {
                this.product = prod
            })
        }

    ngOnInit() {
        this.scrollService.scrollToTop()
        this.productService.checkActiveTab('video')
        this.productService.setBaseView(false)
    }

}
