import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import {filter} from 'rxjs/operators';
import { productsRoutes } from 'src/app/app-routing.module';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.sass']
})
export class ProductComponent {
  baseView!: boolean
  product!: any
  price!: any
  sellStatus!: string
  seller!: string

  constructor(private router: Router, public ProductService: ProductService ) {
    router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    )
      .subscribe((event: any) => {
        const lastLetterBeforeId = event.url.lastIndexOf('/')
        const urlId = event.url.slice(lastLetterBeforeId+1, lastLetterBeforeId+event.url.length-1)

        this.ProductService.getCurrentProduct(urlId)

        this.price = this.ProductService.currentProduct.searchStatus.find((status: any) => status.searchPosition === 'price').option
        this.sellStatus = this.ProductService.currentProduct.searchStatus.find((status: any) => status.searchPosition === 'sell_status').option
        this.seller = this.ProductService.currentProduct.searchStatus.find((status: any) => status.searchPosition === 'seller').option
        
        // якщо відкрита основна сторінка товару без переходу на таби
        if (productsRoutes.find(route => route.id == urlId && (route.id.toString().length + route.title.length == event.url.length-2))) {
          this.baseView = true
        } else {
          this.baseView = false
        }
      });
  }
  
  routes = [
    {name: 'Усе про товар', link: ''}, 
    {name: 'Характеристики', link: 'characteristics'},
    {name: 'Відгуки', link: 'comments'},
    {name: 'Відео', link: 'video'},
    {name: 'Фото', link: 'photos'},
  ]

  newProds = {
    category: 'Гарячі новинки', 
    products: [
      {
        title: 'Набір для прибирання', 
        image: '../../../assets/vileda.webp', 
        price: {old: 2405, new: 1539}
      },
      {
        title: 'Шорти AVRORA сірі', 
        image: '../../../assets/shorts.webp', 
        price: {old: 480, new: 229}
      },
      {
        title: 'Ноутбук ASUS ROG', 
        image: '../../../assets/asus_rog.webp', 
        price: {old: null, new: 82199}
      },
    ]}    
 
}

// в кожного товару на беку має бути рядок куди він відноситься, яка група, підгрупа, категорія і тд щоб цю штуку передавати в бредкрамбс