import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ProductTabsService } from '../../services/product-tabs.service';

@Component({
  selector: 'app-product-characteristics',
  templateUrl: './product-characteristics.component.html',
  styleUrls: ['./product-characteristics.component.sass']
})
export class ProductCharacteristicsComponent {

    constructor(public ProductService: ProductService, private productTabsService: ProductTabsService ) {}

    ngOnInit() {
        this.ProductService.checkActiveTab('characteristics')
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
        this.productTabsService.setBaseView(false)
    }

}
