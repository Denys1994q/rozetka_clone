import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';
import { ProductInterface } from 'src/app/core/services/api-response-types';
import { CommentsService } from 'src/app/comment/services/comments.service';

@Injectable({ providedIn: 'root' })

export class ProductService {
    allCategories!: any
    tab: number = 0
    tabs: any = []
    category!: any 
    subCategory!: any
    product!: any
    price!: any
    sellStatus!: any
    seller!: any
    raiting: number = 0
    newProds: ProductInterface[] = []
    moreProds: ProductInterface[] = []
    recommendedProds: ProductInterface[] = []
    foundedProducts: any = []
    loading: boolean = false
    getOneProductLoading: boolean = false
    getOneProductError: boolean = false

    constructor(
      private CommentsService: CommentsService, 
      private apiService: ApiService) 
    {}

    setNewProducts(data: ProductInterface[]) {
      this.newProds = data
    }

    setMoreProducts(data: ProductInterface[]) {
      this.moreProds = data
    }

    setRecommendedProducts(data: ProductInterface[]) {
      this.recommendedProds = data
    }

    getCurrentProduct(id: string, urlId?: any) {
      this.getOneProductLoading = true
      this.apiService.getOneProduct(id).subscribe({
        next: (response) => {
          this.product = response
          this.setProductPrice()
          this.CommentsService.setComments(this.product.reviews_data)
          if (this.product.video) {
            this.tabs = [
              { name: 'Усе про товар', link: '' },
              { name: 'Характеристики', link: 'characteristics' },
              { name: 'Відгуки', link: 'comments' },
              { name: 'Фото', link: 'photos' },
              { name: 'Відео', link: 'video' }
            ]
          } else {
            this.tabs = [
              { name: 'Усе про товар', link: '' },
              { name: 'Характеристики', link: 'characteristics' },
              { name: 'Відгуки', link: 'comments' },
              { name: 'Фото', link: 'photos' }
            ]
          }
          this.setProductRaiting()
          this.checkActiveTab(urlId)
          this.getOneProductLoading = false
        },
        error: err => {
          this.getOneProductLoading = false
          this.getOneProductError = true
        }
      })
    }

    checkActiveTab(urlId: any) {
      this.tabs.map((tab: any, index: any) => {
        if (tab && tab.link === urlId) {
            this.setTab(index)
        }
    })
    }

    setProductPrice() {
      this.price = this.product.searchStatus.find((status: any) => status.searchPosition === 'price').option
      this.sellStatus = this.product.searchStatus.find((status: any) => status.searchPosition === 'sell_status').option
      this.seller = this.product.searchStatus.find((status: any) => status.searchPosition === 'seller').option
    }

    setProductRaiting() {
      let sum = 0
      this.product.reviews_data.map((review: any) => {
        sum += review.rating || review.raiting
        this.raiting = sum / this.product.reviews_data.length
      })
    }

    findProduct(name: string): any {
      this.resetFoundedProducts()
      this.loading = true
      this.apiService.getAllProducts().subscribe({
        next: products => {
          products.map((prod: any) => {
              this.loading = false
                if (prod.title.toLowerCase().includes(name.toLowerCase())) {
                  this.foundedProducts.push(prod)
                }
          })
        },
        error: err => console.log(err)
      })
    }

    resetFoundedProducts() {
      this.foundedProducts = []
    }

    setAllCategories(data: any) {
      this.allCategories = JSON.parse(JSON.stringify(data)) 
    }

    setCategory(category: any) {
      this.category = category
    }

    setSubcategory(subcategory: any) {
      this.subCategory = subcategory
    }

    setTab(i: number) {
      this.tab = i
    }
    
}