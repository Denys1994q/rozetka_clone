import { Injectable } from '@angular/core';
import { ProductApiService } from './product-api.service';
import { IProduct } from '../models/product.model';
import { BehaviorSubject, Observable, map, of, combineLatest, switchMap, shareReplay, tap } from 'rxjs';
import { IComment } from 'src/app/comment/models/comment.model';
import { AuthService } from 'src/app/core/services/auth.service';

@Injectable({ providedIn: 'root' })

export class ProductService {

    constructor(private productApiService: ProductApiService, private authService: AuthService) {}

    userId$ = new BehaviorSubject('')
    updatedComments$ = new BehaviorSubject<IComment[] | []>([])
    productId$ = new BehaviorSubject<string>('')
    product$: Observable<{isLoading: boolean; value: IProduct | null }> = this.productId$.pipe(
        switchMap(id => this.productApiService.getOneProduct(id)),
        tap(data => {
            if (data.value) {
                this.authService.userData$.subscribe({
                    next: (user) => {
                        const comments = data.value?.reviews_data
                        if (user && user._id) {
                            const newComments = comments && comments.map(c => {
                                if (c.likes.some(l => l.user === user?._id)) {
                                    return {...c, isLiked: 1}
                                } else if (c.dislikes.some(l => l.user === user?._id)) {
                                    return {...c, isLiked: -1}
                                } else {
                                    return {...c, isLiked: 0}
                                }
                            })
                            if (newComments) {
                                this.comments$.next(newComments)
                            }
                        } else {
                            comments && this.comments$.next(comments)
                        }
                    } 
                })
            }
            
        }),
        shareReplay(1)
    )

    comments$ = new BehaviorSubject<IComment[] | []>([])

    productTabs$ = this.product$.pipe(
        map(prod => {
            const tabs = [
                { name: 'Усе про товар', link: '' },
                { name: 'Характеристики', link: 'characteristics' },
                { name: 'Відгуки', link: 'comments' },
                { name: 'Фото', link: 'photos' }
            ];
            if (prod.value && prod.value.video) {
                tabs.push({ name: 'Відео', link: 'video' });
            }
            return tabs;
        }),
        shareReplay(1)
    );
    urlParam$ = new BehaviorSubject('')

    activeTab$ = combineLatest([this.urlParam$, this.productTabs$]).pipe(
        switchMap(([urlParam, tabs]) => {
          const activeTab = tabs.findIndex(tab => tab.link === urlParam);
          return activeTab ? of(activeTab) : of(0);
        }),
        shareReplay(1)
      );
    
    getProduct(id: string) {
        this.productId$.next(id)
    }
    
    checkActiveTab(urlParam: string) {
        this.urlParam$.next(urlParam)
    }

    updateProdComments(id: string, comment: IComment, isLiked: number) {
        const curComments = this.comments$.getValue();
        const updatedComments = curComments.map(c => {
            if (c._id === id) {
                return {...comment, isLiked: isLiked, user: c.user};
            } else {
                return c;
            }
        });
        this.comments$.next(updatedComments);
    }
        
}