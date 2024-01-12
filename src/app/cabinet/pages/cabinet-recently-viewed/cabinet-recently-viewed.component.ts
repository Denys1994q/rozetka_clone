import { Component } from '@angular/core';
import { RecentlyViewedService } from '../../services/recently-viewed.service';
import { Subscription, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-cabinet-recently-viewed',
  templateUrl: './cabinet-recently-viewed.component.html',
  styleUrls: ['./cabinet-recently-viewed.component.sass']
})
export class CabinetRecentlyViewedPage {
    loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor(public recentlyViewedService: RecentlyViewedService) {}

    private subscription!: Subscription;

    ngOnInit() {
        this.loading$.next(true)
        this.subscription = this.recentlyViewedService.getRecentlyViewedProds().subscribe({
            next: resp => this.handleUserUpdate(resp.products),
            error: err => this.handleUserUpdate(null)
        })
    }

    handleClearAllClick() {
        this.loading$.next(true)
        this.recentlyViewedService.removeAllRecentlyViewedProds().subscribe({
            next: response => {
                this.loading$.next(false)
                this.recentlyViewedService.setRecentlyViewedItems(response.updatedProds)
            },
            error: err => this.loading$.next(false)
        })
    }

    handleUserUpdate(products: any) {
        this.loading$.next(false)
        if (products) {
            this.recentlyViewedService.setRecentlyViewedItems(products);
        }
    }

    onCardDeleteBtnClick(prodId: string) {
        this.recentlyViewedService.removeOneRecentlyViewedProd(prodId).subscribe({
            next: resp => {
                this.loading$.next(true)
                this.subscription = this.recentlyViewedService.getRecentlyViewedProds().subscribe({
                    next: resp => this.handleUserUpdate(resp.products),
                    error: err => this.handleUserUpdate(null)
                })
            } 
        })
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

}