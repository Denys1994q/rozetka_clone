import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ProductInterface } from 'src/app/core/services/api-response-types';

@Injectable({ providedIn: 'root' })

export class RecentlyViewedService {
    private backendUrl = 'https://evergreen-purrfect-agenda.glitch.me';

    constructor(private http: HttpClient) { }

    private recentlyViewedItemsSubject = new BehaviorSubject<ProductInterface[]>([]);
    recentlyViewedtItems$: Observable<any[]> = this.recentlyViewedItemsSubject.asObservable();

    setRecentlyViewedItems(data: ProductInterface[]) {
        this.recentlyViewedItemsSubject.next(data)
    }

    addToRecentlyViewedProds(productId: string):Observable<{message: string}> {
        if (typeof window !== 'undefined' && localStorage) {
            const apiUrl = `${this.backendUrl}/add-to-recentlyViewedProds/${productId}` 
            const token = localStorage.getItem('authToken');
            const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
            const options = {
                headers,
                withCredentials: true
            };
            return this.http.post<{message: string, updatedWishlist: string[]}>(apiUrl, null, options);
        } else {
            return throwError('Local storage is not available.');
        }
    }

    removeAllRecentlyViewedProds() {
        if (typeof window !== 'undefined' && localStorage) {
            const apiUrl = `${this.backendUrl}/remove-recentlyViewedProds` 
            const token = localStorage.getItem('authToken');
            const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
            const options = {
                headers,
                withCredentials: true
            };
            return this.http.delete<{message: string, updatedProds: []}>(apiUrl, options)
        } else {
            return throwError('Local storage is not available.');
        }
    }

    removeOneRecentlyViewedProd(prodId: string) {
        if (typeof window !== 'undefined' && localStorage) {
            const apiUrl = `${this.backendUrl}/remove-one-recentlyViewedProd/${prodId}`;
            const token = localStorage.getItem('authToken');
            const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
            return this.http.delete<{message: string}>(apiUrl, { headers, withCredentials: true });
        } else {
            return throwError('Local storage is not available.');
        }
    }

    getRecentlyViewedProds() {
        if (typeof window !== 'undefined' && localStorage) {
            const apiUrl = `${this.backendUrl}/recentlyViewedProds`;
            const token = localStorage.getItem('authToken');
            const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
            return this.http.get<{products: any[]}>(apiUrl, { headers, withCredentials: true });
        } else {
            return throwError('Local storage is not available.');
        }
    }
    
}