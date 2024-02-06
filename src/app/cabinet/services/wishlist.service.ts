import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject} from 'rxjs';
import { Subject, switchMap, tap, combineLatest  } from 'rxjs';
import { WishlistApiService } from './wishlist-api.service';

@Injectable({ providedIn: 'root' })

export class WishlistService {
        activeSortOption$ = new BehaviorSubject(this.wishlistApiService.sortOptions[0])
        prodIdsToDelete$: Subject<string[]> = new Subject<string[]>()
        isProductDeleted$ = new BehaviorSubject<boolean>(false)

        constructor(private wishlistApiService: WishlistApiService) {}
        
        products$: Observable<any> = combineLatest([ this.activeSortOption$, this.isProductDeleted$]).pipe(
            switchMap(([sortOption]) => this.wishlistApiService.getWishlist(sortOption))    
        )

        deleteProducts$ = this.prodIdsToDelete$.pipe(
            switchMap(productIds => this.wishlistApiService.removeFromWishlist(productIds)),
            tap(() => this.isProductDeleted$.next(true))
        )

        deleteFromWishlist(productIds: string[]) {
            this.prodIdsToDelete$.next(productIds)
        }
    
        setActiveSortOption(sortType: string) {
            this.activeSortOption$.next(sortType)
        }
    
    }
