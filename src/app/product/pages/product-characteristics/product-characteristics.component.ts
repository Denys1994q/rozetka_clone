import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ScrollService } from 'src/app/core/services/scroll.service';
import { IProduct } from '../../models/product.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'

@Component({
  selector: 'app-product-characteristics',
  templateUrl: './product-characteristics.component.html',
  styleUrls: ['./product-characteristics.component.sass']
})
export class ProductCharacteristicsComponent {
    product: IProduct | null = null

    constructor(
        public ProductService: ProductService, 
        private scrollService: ScrollService) {
            this.ProductService.product$.pipe(takeUntilDestroyed()).subscribe(prod => {
                this.product = prod
            })
        }

    ngOnInit() {
        this.ProductService.checkActiveTab('characteristics')
        this.scrollService.scrollToTop()
        this.ProductService.setBaseView(false)
    }

}
