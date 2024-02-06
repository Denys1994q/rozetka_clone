import { Injectable } from '@angular/core';
import { Observable, map, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IProduct } from 'src/app/product/models/product.model';
import { ISearchStatus } from 'src/app/product/models/product.model';
import { startWith } from 'rxjs';

interface WishlistItemResponse {
    product: IProduct,
    addedDate: Date
}

interface WishlistResponse {     
    message: string,
    updatedWishlist: IProduct[]
}

@Injectable({ providedIn: 'root' })

export class WishlistApiService {
    private backendUrl = 'https://evergreen-purrfect-agenda.glitch.me';
    sortOptions: string[] = ['За датою додавання', 'Від дешевих до дорогих', 'Від дорогих до дешевих']
    totalPrice: number = 0

    constructor(private http: HttpClient) {}

    getWishlist(sortOption: string = this.sortOptions[0]): Observable<{isLoading: boolean, value?: IProduct[]}> {
        if (typeof window !== 'undefined' && localStorage) {
            const apiUrl = `${this.backendUrl}/wishlist?sort_by=${sortOption}` 
            const token = localStorage.getItem('authToken');
            const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
            const options = {
                headers,
                withCredentials: true
            };
            return this.http.get<{message: string, wishlist: any[] }>(apiUrl, options).pipe(
                map((response: { message: string, wishlist: any[] }) => {
                    if (response && response.wishlist) {
                        response.wishlist = response.wishlist.map((wishlistItem: WishlistItemResponse) => ({
                            ...wishlistItem.product, 
                            addedDate: wishlistItem.addedDate 
                        }));
                    }
                    this.calcucaleTotalPrice(response.wishlist)
                    return { isLoading: false, value: response.wishlist };
                }),
                startWith({isLoading: true})
            )
        } else {
            return throwError('Local storage is not available.');
        } 
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

    removeFromWishlist(productIds: string[]): Observable<{message: string, updatedWishlist: IProduct[]}> {
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
                        }))
                    }
                    return response;
                })
            )
        } else {
            return throwError('Local storage is not available.');
        }          
    }

    calcucaleTotalPrice(products: IProduct[]) {
        let total = 0
        if (products) {
            for (const item of products) {
                const searchStatus = item.searchStatus;
                if (searchStatus) {
                    const priceOption = searchStatus.find((item: ISearchStatus) => item.searchPosition === 'price')?.option;
                    if (typeof priceOption === 'object') {
                        const itemPrice = priceOption.new;
                        if (itemPrice) {
                            total += itemPrice;
                        }
                    }
                }
            }
        }
        this.totalPrice = total
    }

}