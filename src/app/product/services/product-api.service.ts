import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProduct } from 'src/app/product/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductApiService {
    private backendUrl = 'https://evergreen-purrfect-agenda.glitch.me';

    constructor(private http: HttpClient) { }

    getOneProduct(id: string) {
        const apiUrl = `${this.backendUrl}/products/${id}` 
        return this.http.get<IProduct>(apiUrl);
    }

    getAllProducts(): Observable<IProduct[]> {
        const apiUrl = `${this.backendUrl}/products` 
        return this.http.get<IProduct[]>(apiUrl);
    }

    getNewProducts(): Observable<IProduct[]> {
        const apiUrl = `${this.backendUrl}/newProducts` 
        return this.http.get<IProduct[]>(apiUrl);
    }

    getMoreProducts(): Observable<IProduct[]> {
        const apiUrl = `${this.backendUrl}/moreProducts` 
        return this.http.get<IProduct[]>(apiUrl);
    }

    getRecommendedProducts(): Observable<IProduct[]> {
        const apiUrl = `${this.backendUrl}/recommendedProducts` 
        return this.http.get<IProduct[]>(apiUrl);
    }

}