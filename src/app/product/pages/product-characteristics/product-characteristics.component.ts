import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ScrollService } from 'src/app/core/services/scroll.service';

@Component({
  selector: 'app-product-characteristics',
  templateUrl: './product-characteristics.component.html',
  styleUrls: ['./product-characteristics.component.sass']
})
export class ProductCharacteristicsComponent {
    product$ = this.productService.product$

    constructor(
        public productService: ProductService, 
        private scrollService: ScrollService) {}

    ngOnInit() {
        this.scrollService.scrollToTop()
    }

}
