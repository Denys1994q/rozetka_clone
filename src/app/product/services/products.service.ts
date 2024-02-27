import { Injectable } from "@angular/core";
import { switchMap, Subject, Observable, startWith } from "rxjs";
import { IProduct } from "../models/product.model";
import { ProductApiService } from "./product-api.service";

@Injectable({ providedIn: 'root' })

export class ProductsService {
    getNewProds$ = new Subject<boolean>() 
    getMoreProds$ = new Subject<boolean>() 
    getRecommendedProds$ = new Subject<boolean>() 

    constructor(private productApiService: ProductApiService) {}

    newProducts$: Observable<IProduct[] | null> = this.getNewProds$.pipe(
        switchMap(() => {
            return this.productApiService.getNewProducts()
        }),
        startWith([])
    )

    moreProducts$: Observable<IProduct[] | null> = this.getMoreProds$.pipe(
        switchMap(() => {
            return this.productApiService.getMoreProducts()
        }),
        startWith([])
    )

    recommendedProducts$: Observable<IProduct[] | null> = this.getRecommendedProds$.pipe(
        switchMap(() => {
            return this.productApiService.getRecommendedProducts()
        }),
        startWith([])
    )

    getNewProducts() {
        this.getNewProds$.next(true)
    }

    getMoreProducts() {
        this.getMoreProds$.next(true)
    }

    getRecommendedProducts() {
        this.getRecommendedProds$.next(true)
    }

}