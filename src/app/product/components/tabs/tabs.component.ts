import { Component, Input } from '@angular/core';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.sass']
})
export class TabsComponent {
    @Input() data!: any[] | null
    @Input() startRoute!: string

    constructor(public productService: ProductService) {}

}
