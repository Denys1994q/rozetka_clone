import { Injectable } from "@angular/core";
import { IProduct } from "../models/product.model";
import { BehaviorSubject } from "rxjs";
import { ProductApiService } from "./product-api.service";

@Injectable({ providedIn: 'root' })

export class ProductsSearchService {
    foundedProducts: IProduct[] = []
    getAllProductsLoading$ = new BehaviorSubject<boolean>(false) 

    constructor(private productApiService: ProductApiService) {}

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
}