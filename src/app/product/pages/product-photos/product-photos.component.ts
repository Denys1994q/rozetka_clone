import { Component} from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ScrollService } from 'src/app/core/services/scroll.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-product-photos',
  templateUrl: './product-photos.component.html',
  styleUrls: ['./product-photos.component.sass']
})
export class ProductPhotosComponent {
    prod$ = this.productService.product$
    photos$ = this.prod$.pipe(
        map(prod => prod?.value?.images.filter((image: any) => image.url))
    );

    constructor(
        public productService: ProductService, 
        private scrollService: ScrollService) {}

    ngOnInit() {
        this.scrollService.scrollToTop()
    }

}
