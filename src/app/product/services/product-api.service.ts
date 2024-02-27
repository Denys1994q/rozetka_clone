import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, startWith, tap, shareReplay, of, catchError, BehaviorSubject } from 'rxjs';
import { IProduct } from 'src/app/product/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductApiService {
    private backendUrl = 'https://evergreen-purrfect-agenda.glitch.me';
    prodsError$ = new BehaviorSubject<boolean>(false)
    getOneProductError$ = new BehaviorSubject<boolean>(false)
    getOneProductErrorMsg$ = new BehaviorSubject<string>('')

    constructor(private http: HttpClient) { }

    getOneProduct(id: string): Observable<{ isLoading: boolean; value: IProduct | null }> {
        const apiUrl = `${this.backendUrl}/products/${id}` 
        return this.http.get<IProduct>(apiUrl).pipe(
            map((response: IProduct) => {
                if (response) {
                    response.raiting = this.setProductRaiting(response);
                    response.price = response.searchStatus.find((status: any) => status.searchPosition === 'price')?.option
                    response.sellStatus = response.searchStatus.find((status: any) => status.searchPosition === 'sell_status')?.option
                    response.seller = response.searchStatus.find((status: any) => status.searchPosition === 'seller')?.option
                    return { isLoading: false, value: response };
                } else {
                    return { isLoading: false, value: null };
                }
            }),
            startWith({isLoading: true, value: null}),
            catchError(err => {
                this.getOneProductError$.next(true)
                if (err.message) {
                    this.getOneProductErrorMsg$.next('Код помилки: ' + err.status + '. ' + err.message)
                }
                return of({ isLoading: false, value: null })
            }),
        );
    }
    
    getAllProducts(): Observable<IProduct[]> {
        const apiUrl = `${this.backendUrl}/products` 
        return this.http.get<IProduct[]>(apiUrl);
    }

    getNewProducts(): Observable<IProduct[] | null> {
        const apiUrl = `${this.backendUrl}/newProducts` 
        return this.http.get<IProduct[]>(apiUrl).pipe(
            catchError(() => {
                this.prodsError$.next(true)
                return of(null)
            }),
        )
    }

    getMoreProducts(): Observable<IProduct[] | null> {
        const apiUrl = `${this.backendUrl}/moreProducts` 
        return this.http.get<IProduct[]>(apiUrl).pipe(
            catchError(() => {
                this.prodsError$.next(true)
                return of(null)
            }),
        )
    }

    getRecommendedProducts(): Observable<IProduct[] | null> {
        const apiUrl = `${this.backendUrl}/recommendedProducts` 
        return this.http.get<IProduct[]>(apiUrl).pipe(
            catchError(() => {
                this.prodsError$.next(true)
                return of(null)
            }),
        )
    }

    searchProducts(prodName: string): Observable<IProduct[]> {
        const apiUrl = `${this.backendUrl}/search/${prodName}` 
        return this.http.get<IProduct[]>(apiUrl)
    }

    private setProductRaiting(response: IProduct) {
        const copy = {...response}
        const totalRating = copy.reviews_data.reduce((sum, review: any) => sum + (review.rating || review.raiting), 0);
        const averageRating = totalRating / copy.reviews_data.length;
        return averageRating
    }

}