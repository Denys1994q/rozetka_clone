import { Component } from '@angular/core';
import { RecentlyViewedService } from '../../services/recently-viewed.service';
import { RecentlyViewedApiService } from '../../services/recently-viewed-api.service';

@Component({
  selector: 'app-cabinet-recently-viewed',
  templateUrl: './cabinet-recently-viewed.component.html',
  styleUrls: ['./cabinet-recently-viewed.component.sass']
})
export class CabinetRecentlyViewedPage {
    products$ = this.recentlyViewedService.products$
    error$ = this.recentlyViewedApiService.error$

    constructor(
        private recentlyViewedService: RecentlyViewedService, 
        private recentlyViewedApiService: RecentlyViewedApiService) {}

    onCardDeleteBtnClick(productId: string) {
        this.recentlyViewedService.deleteFromRecentlyViewed(productId)
    }

    handleClearAllClick() {
        this.recentlyViewedService.deleteAllFromRecentlyViewed()
    }

    ngOnDestroy() {
        this.recentlyViewedApiService.resetError()
    }
}