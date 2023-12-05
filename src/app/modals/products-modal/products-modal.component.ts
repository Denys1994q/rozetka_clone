import { Component } from '@angular/core';
import { ModalService } from '../modal.service';
import { SearchResultsService } from 'src/app/search/services/search-results.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-products-modal',
  templateUrl: './products-modal.component.html',
  styleUrls: ['./products-modal.component.sass']
})

export class ProductsModalComponent {
    activeCategoryIndex: number | boolean = false
    products!: any[]
    mobVersion: boolean = false

    constructor(
        public modalService: ModalService, 
        public SearchResultsService: SearchResultsService, 
        public router: Router,  
        public route:ActivatedRoute, 
        public apiService: ApiService) {}
    
    ngOnInit() {
        this.apiService.getAllCategories().subscribe({
            next: (data) => this.products = data,
            error: (err) => console.log(err)
        })
        if (typeof window !== 'undefined') {
            if (window.innerWidth < 700) {
                this.mobVersion = true
            } else {
                this.activeCategoryIndex = 0
            }
        }
    }

    getSubcategories() {
        if (typeof(this.activeCategoryIndex) === 'number') {
            return this.products[this.activeCategoryIndex].subCategories.filter((data: any) => data.popular && data.popular.length > 0)
        }
    }

    onMouseEnter(i: number) {
        this.activeCategoryIndex = i
    }
  
    closeDialog() {
        this.modalService.closeDialog()
    }

    closeDialog2(id: any) {
        this.SearchResultsService.removeAll()
        this.SearchResultsService.getCurrentCategory(id)
        this.modalService.closeDialog()
    }

    takeValueAndCloseDialog(value: string, id: string, categoryId: string) {
        const lastLetterBeforeId = this.router.url.lastIndexOf('/')
        const  routerId = this.router.url.slice(lastLetterBeforeId+1, lastLetterBeforeId+this.router.url.length-1)
        // якщо перейшли на інший роут, а не в межах свого. 
        if (routerId !== id) {
        // якщо роут не такий як в головної підкатегорії 
            if (id !== categoryId) {
                this.SearchResultsService.removeAll()
                this.SearchResultsService.getCurrentCategory(id)
                this.modalService.closeDialog()
            } else {
                this.SearchResultsService.removeAll()
                this.SearchResultsService.setBaseInput(value)
            }
        } else {
            this.SearchResultsService.removeAll()
            this.SearchResultsService.setBaseInput(value)
            this.SearchResultsService.getCurrentCategory(id)
        }
        this.modalService.closeDialog()
    }
    
    mobSetActiveCategory(i: number) {
        this.activeCategoryIndex = i
    }

    isBoolean(value: any): boolean {
        return typeof value === 'boolean';
      }
}

