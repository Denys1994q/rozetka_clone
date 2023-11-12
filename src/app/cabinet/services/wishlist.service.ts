import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, map } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProductInterface } from 'src/app/core/services/api-response-types';
import { ISearchStatus } from 'src/app/core/services/api-response-types';

interface WishlistResponse {     
    message: string,
    updatedWishlist: ProductInterface[]
}

interface WishlistItemResponse {
    product: ProductInterface,
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

    setWishlistItems(data: ProductInterface[]) {
        this.wishlistItemsSubject.next(data)
        this.sortWishlist(this.activeSortOption)
        this.calculateTotalPrice(data) 
    }

    addToWishlist(productId: string):Observable<{message: string, updatedWishlist: ProductInterface[]}> {
        const apiUrl = `${this.backendUrl}/add-to-wishlist/${productId}` 
        const token = localStorage.getItem('authToken');
        const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
        const options = {
            headers,
            withCredentials: true
        };
        return this.http.post<{message: string, updatedWishlist: ProductInterface[]}>(apiUrl, null, options).pipe(
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
    }

    removeFromWishlist(productIds: string[]): Observable<WishlistResponse> {
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
    }

    sortWishlist(sortType: string) {
        this.activeSortOption = sortType
        const currentWishlist = this.wishlistItemsSubject.getValue();
        let sortedWishlist = [...currentWishlist];

        if (sortType === 'Від дорогих до дешевих') { 
            sortedWishlist = sortedWishlist.sort((a: any,b: any) => b.searchStatus.find((it: any) => it.searchPosition === 'price').option.new - a.searchStatus.find((it: any) => it.searchPosition === 'price' ).option.new)
        } else if (sortType === 'Від дешевих до дорогих') {
            sortedWishlist = sortedWishlist.sort((a: any,b: any) => a.searchStatus.find((it: any) => it.searchPosition === 'price' ).option.new - b.searchStatus.find((it: any) => it.searchPosition === 'price' ).option.new)
        } else if (sortType === 'За датою додавання') {
            sortedWishlist = sortedWishlist.sort((a: any, b: any) => {
                const dateA = new Date(a.addedDate);
                const dateB = new Date(b.addedDate);
                if (dateA > dateB) {
                    return -1;
                } else if (dateA < dateB) {
                    return 1;
                } else {
                    return 0; 
                }
        })
        }
        this.wishlistItemsSubject.next(sortedWishlist);
    }

    calculateTotalPrice(wishlistItems: ProductInterface[]) {
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