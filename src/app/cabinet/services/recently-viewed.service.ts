import { Injectable } from '@angular/core';
import { Observable, switchMap, combineLatest, tap, BehaviorSubject } from 'rxjs';
import { IProduct } from 'src/app/product/models/product.model';
import { RecentlyViewedApiService } from './recently-viewed-api.service';

@Injectable({ providedIn: 'root' })

export class RecentlyViewedService {

    constructor(private recentlyViewedApiService: RecentlyViewedApiService) {}

    deleteOneClick$: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null)
    deleteAllClick$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)

    products$: Observable<{isLoading: boolean; value: IProduct[] | null}> = combineLatest([
        this.deleteAllClick$,
        this.deleteOneClick$
    ]).pipe(
        switchMap(([deleteAllClick, deleteOneIdClick]) => {
            if (deleteAllClick) {
                return this.handleDeleteAll();
            } else if (deleteOneIdClick) {
                return this.handleDeleteOne(deleteOneIdClick);
            } else {
                return this.recentlyViewedApiService.getRecentlyViewedProds();
            }
        })
    );

    private handleDeleteAll(): Observable<{isLoading: boolean; value: IProduct[] | null}> {
        return this.recentlyViewedApiService.removeAllRecentlyViewedProds().pipe(
            switchMap(() => this.recentlyViewedApiService.getRecentlyViewedProds()),
            tap(() => this.deleteAllClick$.next(false))
        );
    }
    
    private handleDeleteOne(productId: string): Observable<{isLoading: boolean; value: IProduct[] | null}> {
        return this.recentlyViewedApiService.removeOneRecentlyViewedProd(productId).pipe(
            switchMap(() => this.recentlyViewedApiService.getRecentlyViewedProds()),
            tap(() => this.deleteOneClick$.next(null))
        );
    }

    deleteFromRecentlyViewed(id: string) {
        this.deleteOneClick$.next(id)
    }

    deleteAllFromRecentlyViewed() {
        this.deleteAllClick$.next(true)
    }
   
}