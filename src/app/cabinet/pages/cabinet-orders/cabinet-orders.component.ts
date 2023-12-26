import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { OrdersService } from '../../services/orders.service';
import { IProduct } from 'src/app/product/models/product.model';
import { ISearchStatus } from 'src/app/product/models/product.model';

@Component({
  selector: 'app-cabinet-orders',
  templateUrl: './cabinet-orders.component.html',
  styleUrls: ['./cabinet-orders.component.sass']
})
export class CabinetOrdersPage {

    constructor(
        public authService: AuthService, 
        public ordersService: OrdersService) {}

    // завантаження списку продуктів
    loading: boolean = false

    ngOnInit() {
        this.loading = true
            this.ordersService.getOrdersProdsList().subscribe({
                next: response => {
                    if (response) {
                        this.loading = false
                        this.ordersService.setOrdersListItems(response.products)
                    } 
                },
                error: err => this.loading = false
            })
    }

    getPriceObject(prod: IProduct) {
        if (prod.searchStatus && prod.searchStatus.length > 0) {
            const priceStatus = prod.searchStatus.find((status: ISearchStatus) => status.searchPosition === 'price');
            if (priceStatus && priceStatus.option && typeof priceStatus.option === 'object') {
                return priceStatus.option.new;
            }
        }
        return 0; 
    }

}