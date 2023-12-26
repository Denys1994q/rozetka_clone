import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SearchResultsService } from 'src/app/categories/services/search-results.service';
import { CategoriesApiService } from '../../services/categories-api.service';

@Component({
  selector: 'app-main-category',
  templateUrl: './main-category.component.html',
  styleUrls: ['./main-category.component.sass']
})
export class MainCategoryComponent implements OnInit {
  category!: any 
  getOneCategoryLoading: boolean = false
  getOneCategoryError: boolean = false
  
  constructor(
    public router: Router, 
    public route: ActivatedRoute, 
    public SearchResultsService: SearchResultsService, 
    private categoriesApiService: CategoriesApiService,
  ) {}

  ngOnInit(): void {
    // скидаємо попередньо вибрані інпути з інших сторінок, щоб коректно працювало 
    if (this.SearchResultsService.selectedInputs.length > 0) {
      this.SearchResultsService.removeAll()
    }

    this.route.url.subscribe(route => {
        const lastLetterBeforeId = this.router.url.lastIndexOf('/')
        const id = this.router.url.slice(lastLetterBeforeId+1, lastLetterBeforeId+this.router.url.length-1)
        this.getOneCategoryLoading = true
        this.categoriesApiService.getOneCategory(id).subscribe({
            next: (data) => {
                this.getOneCategoryLoading = false
                this.category = data
            },
            error: (err) => {
                this.getOneCategoryLoading = false
                this.getOneCategoryError = true
            }
        })
        })
  }

  getCategories() {
    return this.category.subCategories.filter((item: any) => item.img)
  }

}
