import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { SearchResultsService } from 'src/app/categories/services/search-results.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MenuService } from 'src/app/side-menu/menu.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-middle-category',
  templateUrl: './middle-category.component.html',
  styleUrls: ['./middle-category.component.sass']
})

export class MiddleCategoryComponent {
    activeBtn!: string
    productsNotAvailable: any = []
    priceDataStart!: any
    priceDataEnd!: any

    constructor(
        @Inject(PLATFORM_ID) private platformId: Object,
        public SearchResultsService: SearchResultsService, 
        public router: Router, 
        public route:ActivatedRoute,
        public menuService: MenuService) {}

    ngOnInit(): void {
        this.route.url.subscribe(route => {
            if (isPlatformBrowser(this.platformId)) {
                this.scrollToTop()
            }
            const lastLetterBeforeId = this.router.url.lastIndexOf('/')
            const id = this.router.url.slice(lastLetterBeforeId+1, lastLetterBeforeId+this.router.url.length-1)
            this.SearchResultsService.getCurrentCategory(id)
      })
    }

    onSearchPanelChange(event: any) {
        this.SearchResultsService.addInput(event)
    }

    onFilterChange(event: any) {
        this.SearchResultsService.sortData(event)
    }

    onBtnsGridPanelChange(event: string) {
        this.activeBtn = event
    }

    scrollToTop() {
        window.scrollTo({top: 0, behavior: "smooth"});
    }

}

