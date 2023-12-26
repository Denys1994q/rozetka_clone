import { Component} from '@angular/core';
import { SearchResultsService } from 'src/app/categories/services/search-results.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MenuService } from 'src/app/core/components/side-menu/menu.service';
import { ScrollService } from 'src/app/core/services/scroll.service';

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
        public SearchResultsService: SearchResultsService, 
        public router: Router, 
        public route:ActivatedRoute,
        private scrollService: ScrollService,
        public menuService: MenuService) {}

    ngOnInit(): void {
        this.route.url.subscribe(route => {
            this.scrollService.scrollToTop()
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

    ngOnDestroy() {
        this.SearchResultsService.currentCategory = null
        this.SearchResultsService.currentSubcategory = null
    }

}

