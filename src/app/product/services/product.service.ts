import { Injectable } from '@angular/core';
import { ProductApiService } from './product-api.service';
import { IProduct } from '../models/product.model';
import { CommentsService } from 'src/app/comment/services/comments.service';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class ProductService {
    product$ = new BehaviorSubject<IProduct | null>(null)
    tab: number = 0
    productTabs: {name: string, link: string}[] = []
    newProds$ = new BehaviorSubject<IProduct[]>([]) 
    moreProds$ = new BehaviorSubject<IProduct[]>([]) 
    recommendedProds$ = new BehaviorSubject<IProduct[]>([]) 
    foundedProducts: IProduct[] = []
    getAllProductsLoading$ = new BehaviorSubject<boolean>(false) 
    getOneProductLoading$ = new BehaviorSubject<boolean>(false) 
    getOneProductError$ = new BehaviorSubject<boolean>(false) 
    getOneProductErrorMsg: string = ''

    constructor(
        private CommentsService: CommentsService, 
        private productApiService: ProductApiService) {}

    setNewProducts(data: IProduct[]) {
        this.newProds$.next(data)
    }

    setMoreProducts(data: IProduct[]) {
        this.moreProds$.next(data)
    }

    setRecommendedProducts(data: IProduct[]) {
        this.recommendedProds$.next(data)
    }

    getCurrentProduct(id: string, urlId?: any) {
        this.getOneProductError$.next(false)
        this.getOneProductLoading$.next(true) 
        this.productApiService.getOneProduct(id).pipe(
                map((response: IProduct) => {
                    response.price = response.searchStatus.find((status: any) => status.searchPosition === 'price')?.option
                    response.sellStatus = response.searchStatus.find((status: any) => status.searchPosition === 'sell_status')?.option
                    response.seller = response.searchStatus.find((status: any) => status.searchPosition === 'seller')?.option
                    response.raiting = this.setProductRaiting(response)        
                    return response 
                }),
            )  
            .subscribe({
                next: (response: IProduct) => {
                    this.product$.next({...response})
                    this.CommentsService.setComments(response.reviews_data)
                    this.createTabs(response.video)
                    this.checkActiveTab(urlId)
                    this.getOneProductLoading$.next(false)
                },
                error: err => {
                    this.getOneProductLoading$.next(false) 
                    this.getOneProductError$.next(true)
                    if (err.error.message) {
                        this.getOneProductErrorMsg = 'Код помилки: ' + err.status + '. ' + err.error.message
                    }
                }
            })
    }

    createTabs(video: string) {
        const tabs = [
            { name: 'Усе про товар', link: '' },
            { name: 'Характеристики', link: 'characteristics' },
            { name: 'Відгуки', link: 'comments' },
            { name: 'Фото', link: 'photos' },
        ]
        if (video) {
            this.productTabs = [
                ...tabs,
                { name: 'Відео', link: 'video' }
            ]
        } else {
            this.productTabs = [...tabs]
        }
    }

    checkActiveTab(urlId: any) {
        this.productTabs.map((tab: any, index: any) => {
            if (tab && tab.link === urlId) this.setTab(index)
        })
    }

    setProductRaiting(response: IProduct) {
        const copy = {...response}
        const totalRating = copy.reviews_data.reduce((sum, review: any) => sum + (review.rating || review.raiting), 0);
        const averageRating = totalRating / copy.reviews_data.length;
        return averageRating
    }

    findProduct(name: string): any {
        this.resetFoundedProducts()
        this.getAllProductsLoading$.next(true)
        this.productApiService.searchProducts(name).subscribe({
            next: data => {
                this.getAllProductsLoading$.next(false)
                this.foundedProducts = data
            },
            error: err => console.log(err)
        })
    }

    resetFoundedProducts() {
        this.foundedProducts = []
    }

    setTab(i: number) {
        this.tab = i
    }

    resetProduct() {
        this.product$.next(null)
    }
    
}