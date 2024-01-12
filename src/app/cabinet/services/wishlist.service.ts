import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, map, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IProduct } from 'src/app/product/models/product.model';
import { ISearchStatus } from 'src/app/product/models/product.model';

interface WishlistResponse {     
    message: string,
    updatedWishlist: IProduct[]
}

interface WishlistItemResponse {
    product: IProduct,
    addedDate: Date
}

@Injectable({ providedIn: 'root' })

export class WishlistService {
    private backendUrl = 'https://evergreen-purrfect-agenda.glitch.me';

    constructor(private http: HttpClient) { }

    private wishlistItemsSubject = new BehaviorSubject<any[]>([]);
    wishlistItems$: Observable<any[]> = this.wishlistItemsSubject.asObservable();
    total: number = 0
    sortOptions: string[] = ['За датою додавання', 'Від дешевих до дорогих', 'Від дорогих до дешевих']
    activeSortOption: string = this.sortOptions[0]

    setWishlistItems(data: IProduct[]) {
        this.wishlistItemsSubject.next(data)
        this.calculateTotalPrice(data) 
    }

    addToWishlist(productId: string):Observable<{message: string, updatedWishlist: IProduct[]}> {
        if (typeof window !== 'undefined' && localStorage) {
            const apiUrl = `${this.backendUrl}/add-to-wishlist/${productId}` 
            const token = localStorage.getItem('authToken');
            const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
            const options = {
                headers,
                withCredentials: true
            };
            return this.http.post<{message: string, updatedWishlist: IProduct[]}>(apiUrl, null, options).pipe(
                map((response: any) => {
                    if (response && response.updatedWishlist) {
                        response.updatedWishlist = response.updatedWishlist.map((wishlistItem: WishlistItemResponse) => ({
                            ...wishlistItem.product, 
                            addedDate: wishlistItem.addedDate 
                        }));
                    }
                    return response;
                })
            )
        } else {
            return throwError('Local storage is not available.');
        }
    }

    removeFromWishlist(productIds: string[]): Observable<WishlistResponse> {
        if (typeof window !== 'undefined' && localStorage) {
            const apiUrl = `${this.backendUrl}/remove-from-wishlist`;
            const token = localStorage.getItem('authToken');
            const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
            const data = { productIds };
            return this.http.delete<WishlistResponse>(apiUrl, { headers, body: data, withCredentials: true }).pipe(
                map((response: any) => {
                    if (response && response.updatedWishlist) {
                        response.updatedWishlist = response.updatedWishlist.map((wishlistItem: WishlistItemResponse) => ({
                            ...wishlistItem.product, 
                            addedDate: wishlistItem.addedDate 
                        }));
                    }
                    return response;
                })
            )
        } else {
            return throwError('Local storage is not available.');
        }
    }

    sortWishlist(sortType: string) {
        this.activeSortOption = sortType
        if (typeof window !== 'undefined' && localStorage) {
            const apiUrl = `${this.backendUrl}/wishlist/sort/${sortType}` 
            const token = localStorage.getItem('authToken');
            const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
            const options = {
                headers,
                withCredentials: true
            };
            return this.http.get<{message: string, sortedWishlist: IProduct[]}>(apiUrl, options).pipe(
                map((response: any) => {
                    if (response && response.sortedWishlist) {
                        response.sortedWishlist = response.sortedWishlist.map((wishlistItem: WishlistItemResponse) => ({
                            ...wishlistItem.product, 
                            addedDate: wishlistItem.addedDate 
                        }));
                    }
                    return response;
                })
            )
        } else {
            return throwError('Local storage is not available.');
        }
    }

    calculateTotalPrice(wishlistItems: IProduct[]) {
        this.total = 0 
        if (wishlistItems) {
            for (const item of wishlistItems) {
                const searchStatus = item.searchStatus;
                if (searchStatus) {
                    const priceOption = searchStatus.find((item: ISearchStatus) => item.searchPosition === 'price')?.option;
                    if (typeof priceOption === 'object') {
                        const itemPrice = priceOption.new;
                        if (itemPrice) {
                            this.total += itemPrice;
                        }
                    }
                }
            }
        }
    }

}