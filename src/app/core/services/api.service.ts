import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductInterface } from './api-response-types'

@Injectable({
  providedIn: 'root'
})
export class ApiService {
    private backendUrl = 'https://evergreen-purrfect-agenda.glitch.me';

    constructor(private http: HttpClient) { }

    getAllCategories(): Observable<any> {
        const apiUrl = `${this.backendUrl}/categories` 
        return this.http.get<any>(apiUrl);
    }

    getOneCategory(id: string): Observable<any> {
        const apiUrl = `${this.backendUrl}/categories/${id}` 
        return this.http.get<any>(apiUrl);
    }

    getOneProduct(id: string) {
        const apiUrl = `${this.backendUrl}/products/${id}` 
        return this.http.get<ProductInterface>(apiUrl);
    }

    getAllProducts(): Observable<ProductInterface[]> {
        const apiUrl = `${this.backendUrl}/products` 
        return this.http.get<ProductInterface[]>(apiUrl);
    }

    getSomeProducts(): Observable<ProductInterface[]> {
        const apiUrl = `${this.backendUrl}/someProducts` 
        return this.http.get<ProductInterface[]>(apiUrl);
    }

    getNewProducts(): Observable<ProductInterface[]> {
        const apiUrl = `${this.backendUrl}/newProducts` 
        return this.http.get<ProductInterface[]>(apiUrl);
    }

    getMoreProducts(): Observable<ProductInterface[]> {
        const apiUrl = `${this.backendUrl}/moreProducts` 
        return this.http.get<ProductInterface[]>(apiUrl);
    }

    getRecommendedProducts(): Observable<ProductInterface[]> {
        const apiUrl = `${this.backendUrl}/recommendedProducts` 
        return this.http.get<ProductInterface[]>(apiUrl);
    }
}
