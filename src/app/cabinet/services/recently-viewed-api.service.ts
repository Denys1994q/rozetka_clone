import { Injectable } from "@angular/core";
import { Observable, throwError, map, startWith, concat, switchMap, timer, catchError, of, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IProduct } from 'src/app/product/models/product.model';

@Injectable({ providedIn: 'root' })

export class RecentlyViewedApiService {
    private backendUrl = 'https://evergreen-purrfect-agenda.glitch.me';
    isGetRecentlyViewedProds!: boolean
    errorStatus$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)

    error$: Observable<boolean> = this.errorStatus$.pipe(
        switchMap(errorValue => {
            if (errorValue) {
                return !this.isGetRecentlyViewedProds ? 
                    concat(of(true), timer(5000).pipe(switchMap(() => of(false)))) : 
                    of(true);
            } else {
                return of(false);
            }
        })
    );

    constructor(private http: HttpClient) { }

    getRecentlyViewedProds(): Observable<{isLoading: boolean; value: IProduct[] | null}> {
        if (typeof window !== 'undefined' && localStorage) {
            const apiUrl = `${this.backendUrl}/recentlyViewedProds`;
            const token = localStorage.getItem('authToken');
            const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
            return this.http.get<any>(apiUrl, { headers, withCredentials: true }).pipe(
                map(data => ({ isLoading: false, value: data.products })),
                startWith({isLoading: true, value: null}),
                catchError(() => {
                    this.isGetRecentlyViewedProds = true
                    this.errorStatus$.next(true)
                    return of({isLoading: false, value: null})
                }),
            )
        } else {
            return throwError('Local storage is not available.');
        }
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
            return this.http.post<{message: string, updatedWishlist: string[]}>(apiUrl, null, options)
        } else {
            return throwError('Local storage is not available.');
        }
    }

    removeAllRecentlyViewedProds():Observable<{message: string} | null> {
        if (typeof window !== 'undefined' && localStorage) {
            const apiUrl = `${this.backendUrl}/remove-recentlyViewedProds` 
            const token = localStorage.getItem('authToken');
            const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
            const options = {
                headers,
                withCredentials: true
            };
            return this.http.delete<{message: string, updatedProds: []}>(apiUrl, options).pipe(
                catchError(error => {
                    this.errorStatus$.next(true)
                    return of(null)
                })
            )
        } else {
            return throwError('Local storage is not available.');
        }
    }

    removeOneRecentlyViewedProd(prodId: string):Observable<{message: string} | null> {
        if (typeof window !== 'undefined' && localStorage) {
            const apiUrl = `${this.backendUrl}/remove-one-recentlyViewedProd/${prodId}`;
            const token = localStorage.getItem('authToken');
            const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
            return this.http.delete<{message: string}>(apiUrl, { headers, withCredentials: true }).pipe(
                catchError(error => {
                    this.errorStatus$.next(true)
                    return of(null)
                })
            )
        } else {
            return throwError('Local storage is not available.');
        }
    }

    resetError() {
        this.errorStatus$.next(false)
    }

}