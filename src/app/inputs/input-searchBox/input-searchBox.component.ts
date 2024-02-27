import { Component} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { ProductsSearchService } from 'src/app/product/services/products-search.service';

@Component({
  selector: 'app-input-searchBox',
  templateUrl: './input-searchBox.component.html',
  styleUrls: ['./input-searchBox.component.sass']
})
export class InputSearchBoxComponent {
    searchInpValue: string = ''
    private searchInputSubject = new Subject<string>();
    showOverlay: boolean = false
    getAllProductsLoading: boolean = false

    constructor(private router: Router, public productsSearchService: ProductsSearchService) {
        
        this.productsSearchService.getAllProductsLoading$.subscribe(data => {
            this.getAllProductsLoading = data
        })
    }

    ngOnInit(): void {
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.closeAndReset()
                this.showOverlay = false
            }
        });
        this.searchInputSubject.pipe(
            debounceTime(300),
            distinctUntilChanged(),
        ).subscribe({
            next: (value) => this.productsSearchService.findProduct(value)
        });
    }

    findProd() {
        if (!this.searchInpValue) {
            this.closeAndReset()
        } else {
            this.showOverlay = true
            this.searchInputSubject.next(this.searchInpValue);
        } 
    }

    closeAndReset() {
        this.searchInpValue = ''
        this.productsSearchService.resetFoundedProducts()
    }
}
